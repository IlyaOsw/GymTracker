import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  writeBatch,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { SubTitle } from "../../../components/SubTitle/SubTitle";
import {
  IApproach,
  IExercise,
  ExerciseTablePropsType,
  ExerciseTableType,
} from "../../../types/types";
import { EmptyBox } from "../../../components/EmptyBox/EmptyBox";
import { scrollToBottom } from "../../../utils/scrollToBottom";
import { ClosableMessage } from "../../../components/ClosableMessage/ClosableMessage";

import styles from "./ExerciseTable.module.scss";
import { TableFooter } from "./TableFooter/TableFooter";
import { BestResult } from "./BestResult/BestResult";
import { DeleteWorkout } from "./DeleteWorkout/DeleteWorkout";
import { DataTable } from "./DataTable/DataTable";

export const ExerciseTable: React.FC<ExerciseTablePropsType> = React.memo(
  ({ selectedExercise, setSelectedExercise, setActiveCardId }) => {
    const user = getAuth().currentUser;
    const { t } = useTranslation();
    const [data, setData] = useState<ExerciseTableType[]>([]);
    const [bestResult, setBestResult] = useState<{
      weight: string;
      reps: string;
    } | null>(null);
    const [editWeight, setEditWeight] = useState<string | null>(null);
    const [editReps, setEditReps] = useState<string | null>(null);
    const [workoutDate, setWorkoutDate] = useState<string | null>(null);
    const [currentWorkout, setCurrentWorkout] = useState(false);
    const [addRowBtn, setAddRowBtn] = useState(false);
    const [saveBtn, setSaveBtn] = useState(false);
    const [deleteBtn, setDeleteBtn] = useState(true);
    const [showHistory, setShowHistory] = useState(false);

    const weightInputRef = useRef<HTMLInputElement | null>(null);
    const repsInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (editReps && repsInputRef.current) {
        repsInputRef.current.focus();
      }
      if (editWeight && weightInputRef.current) {
        weightInputRef.current.focus();
      }
    }, [editReps, editWeight]);

    const loadExerciseData = useCallback(async () => {
      if (user && selectedExercise) {
        const setsCollectionRef = collection(getFirestore(), "sets");
        const setDocRef = doc(setsCollectionRef, selectedExercise.id);
        const exercisesDocRef = doc(getFirestore(), "exercises", user.uid);

        try {
          const [docSnapshot, exercisesDoc] = await Promise.all([
            getDoc(setDocRef),
            getDoc(exercisesDocRef),
          ]);
          setShowHistory(false);
          if (docSnapshot.exists()) {
            const workouts = docSnapshot.data()?.workouts || [];

            if (workouts.length > 0) {
              const latestWorkout = workouts[workouts.length - 1];
              const workoutDate = new Date(
                latestWorkout.date
              ).toLocaleDateString();

              setWorkoutDate(workoutDate);
              const approaches = latestWorkout.approaches || [];
              const loadedData: ExerciseTableType[] = approaches.map(
                (approach: IApproach) => ({
                  key: approach.id,
                  set: approach.set,
                  weight: approach.weight,
                  reps: approach.reps,
                })
              );

              setData(loadedData);
              scrollToBottom();
              setDeleteBtn(true);
            } else {
              setData([]);
              setWorkoutDate(null);
              setDeleteBtn(false);
            }

            if (exercisesDoc.exists()) {
              const exercisesData = exercisesDoc.data();
              const exercise = exercisesData.exercises.find(
                (ex: { id: string }) => ex.id === selectedExercise.id
              );
              if (exercise) {
                setBestResult(exercise.bestResult);
              } else {
                setBestResult(null);
              }
            }
          } else {
            setData([]);
            setWorkoutDate(null);
            setBestResult(null);
            scrollToBottom();
            setDeleteBtn(false);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }, [selectedExercise, user]);

    useEffect(() => {
      if (selectedExercise) {
        loadExerciseData();
      } else {
        setData([]);
        setBestResult(null);
      }
    }, [selectedExercise, loadExerciseData]);

    const saveExerciseData = async () => {
      if (user && selectedExercise) {
        const validData = data.filter(
          (row) => Number(row.reps) > 0 && Number(row.weight) > 0
        );

        if (validData.length === 0) {
          ClosableMessage({ type: "error", content: t("noDataToSave") });
          return;
        }
        const setsCollectionRef = collection(getFirestore(), "sets");
        const exercisesDocRef = doc(getFirestore(), "exercises", user.uid);

        try {
          const batch = writeBatch(getFirestore());
          const setDocRef = doc(setsCollectionRef, selectedExercise.id);
          const setDoc = await getDoc(setDocRef);
          const setData = setDoc.exists() ? setDoc.data() : { workouts: [] };

          const newWorkout = {
            id: uuidv4(),
            date: new Date().toISOString(),
            approaches: validData.map((row, index) => ({
              id: uuidv4(),
              set: index + 1,
              reps: row.reps,
              weight: row.weight,
            })),
          };

          setData.workouts.push(newWorkout);
          batch.set(setDocRef, setData);

          const exercisesDoc = await getDoc(exercisesDocRef);
          if (exercisesDoc.exists()) {
            const exercisesData = exercisesDoc.data();
            const updatedExercises = exercisesData.exercises.map(
              (exercise: IExercise) => {
                if (exercise.id === selectedExercise.id) {
                  return {
                    ...exercise,
                  };
                }
                return exercise;
              }
            );
            batch.update(exercisesDocRef, { exercises: updatedExercises });
          }
          await batch.commit();

          setCurrentWorkout(false);
          setAddRowBtn(false);
          setSaveBtn(false);
          setShowHistory(false);
          ClosableMessage({ type: "success", content: t("exerciseDataSaved") });
        } catch (error) {
          ClosableMessage({
            type: "error",
            content: t("errorSavingExerciseData"),
          });
        }
      }
    };

    const handleWorkoutDateChange = useCallback(
      (date: string) => {
        const workoutDate = new Date(date);
        const formattedDate = workoutDate.toLocaleDateString();
        if (!isNaN(workoutDate.getTime())) {
          setWorkoutDate(formattedDate);
          setCurrentWorkout(false);
        }
      },
      [setWorkoutDate, setCurrentWorkout]
    );

    return (
      <>
        <SubTitle
          children={selectedExercise?.name || t("noExerciseSelected")}
          className={styles.subtitle}
        />
        {selectedExercise ? (
          <>
            <BestResult
              bestResult={bestResult}
              selectedExercise={selectedExercise}
              setBestResult={setBestResult}
            />
            {currentWorkout ? (
              <div className={styles.dateWorkout}>
                {t("workoutDate")}:
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            ) : (
              <div className={styles.dateWorkout}>
                {t("workoutDate")}:
                <span>{workoutDate ? workoutDate : ". . ."}</span>
              </div>
            )}
            <DataTable
              data={data}
              setData={setData}
              currentWorkout={currentWorkout}
              editWeight={editWeight}
              weightInputRef={weightInputRef}
              setEditWeight={setEditWeight}
              editReps={editReps}
              repsInputRef={repsInputRef}
              setEditReps={setEditReps}
            />
            <TableFooter
              selectedExercise={selectedExercise}
              data={data}
              setData={setData}
              setEditWeight={setEditWeight}
              saveExerciseData={saveExerciseData}
              onWorkoutDateChange={handleWorkoutDateChange}
              setCurrentWorkout={setCurrentWorkout}
              addRowBtn={addRowBtn}
              setAddRowBtn={setAddRowBtn}
              saveBtn={saveBtn}
              setSaveBtn={setSaveBtn}
              setDeleteBtn={setDeleteBtn}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
            />
            {deleteBtn && (
              <DeleteWorkout
                workoutDate={workoutDate}
                selectedExercise={selectedExercise}
                setData={setData}
                setWorkoutDate={setWorkoutDate}
                setSelectedExercise={setSelectedExercise}
                setActiveCardId={setActiveCardId}
              />
            )}
          </>
        ) : (
          <div className={styles.emptyBox}>
            <EmptyBox />
          </div>
        )}
      </>
    );
  }
);
