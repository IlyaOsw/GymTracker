import React, { useEffect, useRef } from "react";
import { message } from "antd";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";

import { EditInputPropsType, Exercise } from "../../../../../types/types";

import styles from "./EditInput.module.scss";

export const EditInput: React.FC<EditInputPropsType> = ({
  newName,
  editMode,
  currentEditingId,
  setCurrentEditingId,
  category,
  setData,
  setEditMode,
  setNewName,
}) => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  const changeExerciseName = async (exerciseId: string, newName: string) => {
    try {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const exercisesDocRef = doc(db, "exercises", userId);
        const exercisesDoc = await getDoc(exercisesDocRef);
        if (exercisesDoc.exists()) {
          const exercisesData = exercisesDoc.data();
          let updatedExercises = exercisesData.exercises.map(
            (exercise: { id: string; name: string }) => {
              if (exercise.id === exerciseId) {
                return { ...exercise, name: newName };
              }
              return exercise;
            }
          );
          await updateDoc(exercisesDocRef, {
            exercises: updatedExercises,
          });
          const filteredData = updatedExercises
            .filter(
              (exercise: { category: string }) =>
                t(`categories.${exercise.category}`) ===
                t(`categories.${category}`)
            )
            .map((exercise: Exercise) => ({
              id: exercise.id,
              name: t(exercise.name),
              category: exercise.category,
              bestResult: `${t("lastSet")}: ${exercise.bestResult}`,
              isFavorite: exercise.isFavorite,
            }));
          localStorage.setItem("exercisesData", JSON.stringify(filteredData));
          setData(filteredData);
        }
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: t("nameChangeFailed"),
      });
    }
  };

  const handleEditKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && currentEditingId) {
      changeExerciseName(currentEditingId, newName);
      setEditMode(false);
      setCurrentEditingId(null);
    }
  };

  const handleBlur = () => {
    if (currentEditingId) {
      changeExerciseName(currentEditingId, newName);
      setEditMode(false);
      setCurrentEditingId(null);
    }
  };

  return (
    <>
      {contextHolder}
      <input
        value={newName}
        className={styles.editInput}
        onChange={(e) => setNewName(e.target.value)}
        onKeyDown={handleEditKeyDown}
        onBlur={handleBlur}
        ref={inputRef}
      />
    </>
  );
};
