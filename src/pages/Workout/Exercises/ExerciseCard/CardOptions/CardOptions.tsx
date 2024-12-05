import React, { useState } from "react";
import { CheckOutlined, EditOutlined, StarFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { CardOptionsPropsType } from "../../../../../types/types";
import { SettingButton } from "../../../../../components/SettingButton/SettingButton";
import { ClosableMessage } from "../../../../../components/ClosableMessage/ClosableMessage";

import styles from "./CardOptions.module.scss";

export const CardOptions: React.FC<CardOptionsPropsType> = React.memo(
  ({
    item,
    category,
    setData,
    setCurrentEditingId,
    setNewName,
    editMode,
    setEditMode,
  }) => {
    const { t } = useTranslation();
    const [isActive, setIsActive] = useState<boolean>(false);

    const toggleFavorite = async (
      exerciseId: string,
      currentStatus: boolean
    ) => {
      try {
        const user = getAuth().currentUser;
        if (user) {
          const exercisesDocRef = doc(getFirestore(), "exercises", user.uid);
          const exercisesDoc = await getDoc(exercisesDocRef);

          if (exercisesDoc.exists()) {
            const exercisesData = exercisesDoc.data();
            const favoriteExercisesCount = exercisesData.exercises.filter(
              (exercise: { isFavorite: boolean }) => exercise.isFavorite
            ).length;

            if (!currentStatus && favoriteExercisesCount >= 3) {
              ClosableMessage({
                type: "warning",
                content: t("maxFavoritesReached"),
              });
              return;
            }

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

            const translatedCategory = t(category);
            const filteredData = updatedExercises.filter(
              (exercise: { category: string }) =>
                t(exercise.category) === translatedCategory
            );
            setData(filteredData);

            if (!currentStatus) {
              ClosableMessage({
                type: "success",
                content: t("addedToFavorite"),
              });
            } else {
              ClosableMessage({
                type: "success",
                content: t("removedFromFavorite"),
              });
            }

            setIsActive(!isActive);
          }
        }
      } catch (error) {
        ClosableMessage({ type: "error", content: t("errorUpdatingFavorite") });
      }
    };

    const handleEditClick = (exerciseId: string, currentName: string) => {
      setCurrentEditingId(exerciseId);
      setNewName(currentName);
      setEditMode(true);
    };

    return (
      <div className={styles.options}>
        <SettingButton
          icon={<StarFilled />}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id, item.isFavorite);
          }}
          className={`${styles.star} ${item.isFavorite ? styles.active : ""}`}
        >
          <span>{t("favorite")}</span>
        </SettingButton>
        {editMode ? (
          <div>
            <SettingButton icon={<CheckOutlined />}>
              <span>{t("save")}</span>
            </SettingButton>
          </div>
        ) : (
          <SettingButton
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(item.id, item.name);
            }}
            className={styles.editExercise}
          >
            <span>{t("editName")}</span>
          </SettingButton>
        )}
      </div>
    );
  }
);
