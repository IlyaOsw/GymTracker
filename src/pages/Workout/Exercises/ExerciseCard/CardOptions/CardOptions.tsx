import React, { useState } from "react";
import { EditOutlined, StarFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { CardOptionsPropsType } from "../../../../../types/types";
import { SettingButton } from "../../../../../components/SettingButton/SettingButton";

import styles from "./CardOptions.module.scss";

export const CardOptions: React.FC<CardOptionsPropsType> = ({
  item,
  category,
  setData,
  setCurrentEditingId,
  setNewName,
  setEditMode,
}) => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleFavorite = async (exerciseId: string, currentStatus: boolean) => {
    try {
      const user = getAuth().currentUser;
      if (user) {
        const userId = user.uid;
        const exercisesDocRef = doc(getFirestore(), "exercises", userId);
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
          messageApi.open({
            type: "success",
            content: t("addedToFavorite"),
          });
        } else {
          messageApi.open({
            type: "success",
            content: t("removedFromFavorite"),
          });
        }
        setIsActive(!isActive);
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: t("errorUpdatingFavorite"),
      });
    }
  };

  const handleEditClick = (exerciseId: string, currentName: string) => {
    setCurrentEditingId(exerciseId);
    setNewName(currentName);
    setEditMode(true);
  };

  return (
    <div className={styles.options}>
      {contextHolder}
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
    </div>
  );
};
