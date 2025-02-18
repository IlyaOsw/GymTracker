import React, { useState, useEffect } from "react";
import {
  RightOutlined,
  CloseOutlined,
  LeftOutlined,
  PlusOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  writeBatch,
} from "firebase/firestore";
import { CustomButton } from "components/CustomButton/CustomButton";
import { TableFooterPropsType } from "types/table-footer";
import { SettingButton } from "components/SettingButton/SettingButton";
import { ExerciseTableType } from "types/exercise-table";
import { auth } from "index";

import styles from "./TableFooter.module.scss";
import { TrainingHistory } from "./TrainingHistory/TrainingHistory";

export const TableFooter: React.FC<TableFooterPropsType> = React.memo(
  ({
    selectedExercise,
    data,
    setData,
    setEditWeight,
    saveExerciseData,
    onWorkoutDateChange,
    setCurrentWorkout,
    addRowBtn,
    setAddRowBtn,
    saveBtn,
    setSaveBtn,
    setDeleteBtn,
    showHistory,
    setShowHistory,
  }) => {
    const { t } = useTranslation();
    const [workouts, setWorkouts] = useState<ExerciseTableType[][]>([]);
    const [workoutDates, setWorkoutDates] = useState<string[]>([]);
    const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState<number>(-1);
    const [hideButtons, setHideButtons] = useState<boolean>(false);

    useEffect(() => {
      const loadWorkouts = async () => {
        setHideButtons(true);
        setCurrentWorkoutIndex(-1);
        setAddRowBtn(false);
        setSaveBtn(false);
        setDeleteBtn(false);
        setCurrentWorkout(false);
        setData([]);

        if (selectedExercise) {
          const setsCollectionRef = collection(getFirestore(), "sets");

          try {
            const docSnapshot = await getDoc(
              doc(setsCollectionRef, selectedExercise.id)
            );
            if (docSnapshot.exists()) {
              const workoutsData = docSnapshot.data()?.workouts || [];

              if (Array.isArray(workoutsData) && workoutsData.length > 0) {
                setWorkouts(
                  workoutsData.map((workout) => workout.approaches || [])
                );
                setWorkoutDates(workoutsData.map((workout) => workout.date));
                const lastIndex = workoutsData.length - 1;
                setCurrentWorkoutIndex(lastIndex);
                setHideButtons(false);
                onWorkoutDateChange(workoutsData[lastIndex].date);
              } else {
                setData([]);
                setWorkoutDates([]);
                setCurrentWorkoutIndex(-1);
                setHideButtons(true);
              }
            }
          } catch (error) {
            console.error(error);
          }
        }
      };
      loadWorkouts();
    }, [
      selectedExercise,
      onWorkoutDateChange,
      setAddRowBtn,
      setCurrentWorkout,
      setData,
      setDeleteBtn,
      setSaveBtn,
    ]);

    const addRow = () => {
      if (!selectedExercise) return;
      const newData = [...data];
      const nextSet =
        newData.length > 0 ? newData[newData.length - 1].set + 1 : 1;

      const newRow: ExerciseTableType = {
        key: nextSet.toString(),
        weight: "",
        set: nextSet,
        reps: "",
        icon: <CloseOutlined />,
      };

      newData.push(newRow);
      setData(newData);
      setEditWeight(newRow.key);
    };
    const removeOldestWorkout = async () => {
      if (!selectedExercise) return;
      const setDocRef = doc(
        collection(getFirestore(), "sets"),
        selectedExercise.id
      );

      try {
        const docSnapshot = await getDoc(setDocRef);
        if (docSnapshot.exists()) {
          const workouts = docSnapshot.data()?.workouts || [];

          // FOR 1 USER ONLY
          const maxWorkouts =
            auth.currentUser?.uid === "LoZ6EOvGVaOUBC2z5CSa1V37f6e2" &&
            selectedExercise?.id === "327e3e1f-9078-451c-8b39-36b46f61eec6"
              ? 20
              : 5;
          // ---------------

          if (workouts.length >= maxWorkouts) {
            const updatedWorkouts = workouts.slice(1);
            const batch = writeBatch(getFirestore());
            batch.update(setDocRef, { workouts: updatedWorkouts });
            await batch.commit();
            setData(updatedWorkouts);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    const startNewTraining = async () => {
      await removeOldestWorkout();

      setData([]);
      setAddRowBtn(true);
      setSaveBtn(true);
      setHideButtons(true);
      setCurrentWorkout(true);
      setDeleteBtn(false);
      setShowHistory(true);
    };

    const showPreviousWorkout = () => {
      if (currentWorkoutIndex > 0) {
        const newIndex = currentWorkoutIndex - 1;
        setCurrentWorkoutIndex(newIndex);
        setData(workouts[newIndex] || []);
        onWorkoutDateChange(workoutDates[newIndex]);
      }
    };

    const showNextWorkout = () => {
      if (currentWorkoutIndex < workouts.length - 1) {
        const newIndex = currentWorkoutIndex + 1;
        setCurrentWorkoutIndex(newIndex);
        setData(workouts[newIndex] || []);
        onWorkoutDateChange(workoutDates[newIndex]);
      }
    };

    const isLastWorkout = currentWorkoutIndex === workouts.length - 1;

    return (
      <>
        {addRowBtn && (
          <SettingButton onClick={addRow} icon={<PlusOutlined />}>
            {t("addRow")}
          </SettingButton>
        )}
        {saveBtn && (
          <div className={styles.saveBtn}>
            <CustomButton onClick={saveExerciseData} icon={<CheckOutlined />}>
              {t("saveTraining")}
            </CustomButton>
          </div>
        )}
        <div className={styles.tableFooter}>
          {!hideButtons && currentWorkoutIndex > 0 ? (
            <CustomButton onClick={showPreviousWorkout} icon={<LeftOutlined />}>
              {t("previous")}
            </CustomButton>
          ) : (
            <div></div>
          )}
          {!hideButtons && !isLastWorkout && (
            <CustomButton onClick={showNextWorkout} icon={<RightOutlined />}>
              {t("next")}
            </CustomButton>
          )}
          {(isLastWorkout || hideButtons) && !saveBtn && (
            <CustomButton onClick={startNewTraining}>
              {t("newEntry")}
              <RightOutlined />
            </CustomButton>
          )}
        </div>
        <TrainingHistory
          showHistory={showHistory}
          workouts={workouts}
          workoutDates={workoutDates}
        />
      </>
    );
  }
);
