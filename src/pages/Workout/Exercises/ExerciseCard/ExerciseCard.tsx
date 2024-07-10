import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { CustomModal } from "../../../../components/CustomModal/CustomModal";
import { CustomButton } from "../../../../components/CustomButton/CustomButton";
import { Exercise, ExerciseCardPropsType } from "../../../../types/types";

import { CardOptions } from "./CardOptions/CardOptions";
import { DeleteIcon } from "./DeleteIcon/DeleteIcon";

import styles from "./ExerciseCard.module.scss";

export const ExerciseCard: React.FC<ExerciseCardPropsType> = ({
  item,
  onSelectExercise,
  category,
  setData,
  setLoading,
}) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [currentEditingId, setCurrentEditingId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleCancel = () => setIsModalOpen(false);

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

          const translatedCategory = t(`categories.${category}`);
          const filteredData = updatedExercises
            .filter(
              (exercise: { category: string }) =>
                t(`categories.${exercise.category}`) === translatedCategory
            )
            .map(
              (exercise: {
                id: string;
                name: string;
                category: string;
                bestResult: string;
                isFavorite: boolean;
              }) => ({
                id: exercise.id,
                name: t(exercise.name),
                category: exercise.category,
                bestResult: `${t("lastSet")}: ${exercise.bestResult}`,
                isFavorite: exercise.isFavorite,
              })
            );

          localStorage.setItem("exercisesData", JSON.stringify(filteredData));
          setData(filteredData);
        }
      }
    } catch (error) {
      message.error(t("nameChangeFailed"));
    }
  };

  const handleEditKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && currentEditingId) {
      changeExerciseName(currentEditingId, newName);
      setEditMode(false);
      setCurrentEditingId(null);
      setIsModalOpen(false);
    }
  };

  const handleBlur = () => {
    if (currentEditingId) {
      changeExerciseName(currentEditingId, newName);
      setEditMode(false);
      setCurrentEditingId(null);
      setIsModalOpen(false);
    }
  };

  return (
    <div className={styles.cardItem} onClick={() => onSelectExercise(item)}>
      <DeleteIcon
        setLoading={setLoading}
        setIsModalOpen={setIsModalOpen}
        category={category}
        setData={setData}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        item={item}
      />
      {currentEditingId === item.id && editMode ? (
        <CustomModal
          open={isModalOpen}
          onCancel={() => {
            handleCancel();
            setNewName(item.name);
            setEditMode(false);
            setCurrentEditingId(null);
          }}
          footer={false}
        >
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={newName}
              className={styles.editInput}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={handleEditKeyDown}
              onBlur={handleBlur}
            />
          </div>
          <div className={styles.deleteSave}>
            <CustomButton
              children={t("save")}
              onClick={() => changeExerciseName(currentEditingId, newName)}
              icon={<CheckCircleOutlined />}
            />
          </div>
        </CustomModal>
      ) : (
        <div className={styles.exerciseContainer}>
          <span className={styles.exerciseName}>{item.name}</span>
        </div>
      )}
      <CardOptions
        item={item}
        category={category}
        setData={setData}
        setCurrentEditingId={setCurrentEditingId}
        setNewName={setNewName}
        setEditMode={setEditMode}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};
