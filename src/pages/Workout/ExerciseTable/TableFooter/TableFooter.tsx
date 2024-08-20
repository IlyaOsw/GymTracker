import React, { useState, useEffect } from "react";
import {
  RightOutlined,
  CloseOutlined,
  LeftOutlined,
  PlusOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";

import { CustomButton } from "../../../../components/CustomButton/CustomButton";
import {
  ExerciseTableType,
  TableFooterPropsType,
} from "../../../../types/types";
import { SettingButton } from "../../../../components/SettingButton/SettingButton";

import styles from "./TableFooter.module.scss";

export const TableFooter: React.FC<TableFooterPropsType> = ({
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
}) => {
  const { t } = useTranslation();
  const [workouts, setWorkouts] = useState<ExerciseTableType[][]>([]);
  const [workoutDates, setWorkoutDates] = useState<string[]>([]);
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState<number>(-1);
  const [hideButtons, setHideButtons] = useState(false);

  useEffect(() => {
    const loadWorkouts = async () => {
      if (selectedExercise) {
        const setsCollectionRef = collection(getFirestore(), "sets");
        const setDocRef = doc(setsCollectionRef, selectedExercise.id);
        try {
          const docSnapshot = await getDoc(setDocRef);
          if (docSnapshot.exists()) {
            const setData = docSnapshot.data();
            const workouts = setData?.workouts || [];

            if (
              Array.isArray(workouts) &&
              workouts.every((workout) => Array.isArray(workout.approaches))
            ) {
              setWorkouts(workouts.map((workout) => workout.approaches || []));
              setWorkoutDates(workouts.map((workout) => workout.date));
              const lastIndex = workouts.length - 1;
              setCurrentWorkoutIndex(lastIndex);
              onWorkoutDateChange(workouts[lastIndex].date);
            } else {
              console.error("Workouts data format is incorrect.");
            }
          }
        } catch (error) {
          console.error("Error loading workouts:", error);
        }
      }
    };
    setHideButtons(false);
    loadWorkouts();
  }, [selectedExercise]);

  const addRow = () => {
    if (!selectedExercise) {
      return;
    }
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

  const startNewTraining = () => {
    setData([]);
    setAddRowBtn(true);
    setSaveBtn(true);
    setHideButtons(true);
    setCurrentWorkout(true);
    setDeleteBtn(false);
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
        {!hideButtons && isLastWorkout && (
          <CustomButton onClick={startNewTraining}>
            {t("newEntry")}
            <RightOutlined />
          </CustomButton>
        )}
      </div>
    </>
  );
};
