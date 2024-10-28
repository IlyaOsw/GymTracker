import React, { useEffect, useRef } from "react";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useTranslation } from "react-i18next";

import { EditInputPropsType, Exercise } from "../../../../../types/types";
import { ClosableMessage } from "../../../../../components/ClosableMessage/ClosableMessage";

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
  const user = getAuth().currentUser;
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  const changeExerciseName = async (exerciseId: string, newName: string) => {
    try {
      if (user) {
        const userId = user.uid;
        const exercisesDocRef = doc(getFirestore(), "exercises", userId);
        const exercisesDoc = await getDoc(exercisesDocRef);

        if (exercisesDoc.exists()) {
          const exercisesData = exercisesDoc.data();

          const currentExercise = exercisesData.exercises.find(
            (exercise: { id: string }) => exercise.id === exerciseId
          );

          if (currentExercise && currentExercise.name === newName) {
            ClosableMessage({
              type: "warning",
              content: t("nameNotChanged"),
            });
            return;
          }

          if (newName.trim().length < 3) {
            ClosableMessage({
              type: "error",
              content: t("nameMin3Symbols"),
            });
            return;
          }
          const nameExists = exercisesData.exercises.some(
            (exercise: { id: string; name: string }) =>
              exercise.id !== exerciseId && exercise.name === newName
          );

          if (nameExists) {
            ClosableMessage({
              type: "error",
              content: t("nameAlreadyExists"),
            });
            return;
          }

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

          ClosableMessage({
            type: "success",
            content: t("nameUpdated"),
          });
        }
      }
    } catch (error) {
      ClosableMessage({ type: "error", content: t("nameChangeFailed") });
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
    <input
      value={newName}
      className={styles.editInput}
      onChange={(e) => setNewName(e.target.value)}
      onKeyDown={handleEditKeyDown}
      onBlur={handleBlur}
      ref={inputRef}
    />
  );
};