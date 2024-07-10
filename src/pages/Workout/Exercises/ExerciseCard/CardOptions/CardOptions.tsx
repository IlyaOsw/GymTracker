import React, { useState } from "react";
import { EditOutlined, StarFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { CardOptionsPropsType } from "../../../../../types/types";

import styles from "./CardOptions.module.scss";

export const CardOptions: React.FC<CardOptionsPropsType> = ({
  item,
  category,
  setData,
  setCurrentEditingId,
  setNewName,
  setEditMode,
  setIsModalOpen,
}) => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleFavorite = async (exerciseId: string, currentStatus: boolean) => {
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
            (exercise: { id: string }) => {
              if (exercise.id === exerciseId) {
                return { ...exercise, isFavorite: !currentStatus };
              }
              return exercise;
            }
          );
          await updateDoc(exercisesDocRef, {
            exercises: updatedExercises,
          });

          const translatedCategory = t(`categories.${category}`);
          const filteredData = updatedExercises.filter(
            (exercise: { category: string }) =>
              t(`categories.${exercise.category}`) === translatedCategory
          );
          setData(filteredData);
        }

        if (!currentStatus) {
          message.success(t("addedToFavorite"));
        } else {
          message.success(t("removedFromFavorite"));
        }
        setIsActive(!isActive);
      }
    } catch (error) {
      message.error(t("errorUpdatingFavorite"));
    }
  };

  const handleEditClick = (exerciseId: string, currentName: string) => {
    setCurrentEditingId(exerciseId);
    setNewName(currentName);
    setEditMode(true);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.options}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(item.id, item.isFavorite);
        }}
        className={`${styles.star} ${item.isFavorite ? styles.active : ""}`}
      >
        <StarFilled /> {t("favorite")}
      </button>
      <button
        className={styles.editBtn}
        onClick={(e) => {
          e.stopPropagation();
          handleEditClick(item.id, item.name);
        }}
      >
        <EditOutlined className={styles.editIcon} />
        {t("editName")}
      </button>
    </div>
  );
};
