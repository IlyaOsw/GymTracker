import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { message } from "antd";

import { CustomModal } from "../../../../../../components/CustomModal/CustomModal";
import { ResetButton } from "../../../../../../components/ResetButton/ResetButton";
import { ModalDeletePropsType, Exercise } from "../../../../../../types/types";

import styles from "../DeleteIcon.module.scss";

export const ModalDelete: React.FC<ModalDeletePropsType> = ({
  setLoading,
  setIsModalOpen,
  category,
  setData,
  isModalOpen,
  handleCancel,
  item,
  setConfirm,
}) => {
  const { t } = useTranslation();

  const handleDeleteCard = async (exerciseId: string) => {
    setLoading(true);
    try {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const exercisesDocRef = doc(db, "exercises", userId);
        const setsCollectionRef = doc(db, "sets", exerciseId);
        const exercisesDoc = await getDoc(exercisesDocRef);

        await deleteDoc(setsCollectionRef);
        if (exercisesDoc.exists()) {
          const exercisesData = exercisesDoc.data();
          let updatedExercises: Exercise[] = [];

          if (exercisesData && exercisesData.exercises) {
            updatedExercises = exercisesData.exercises.filter(
              (exercise: Exercise) => exercise.id !== exerciseId
            );

            await updateDoc(exercisesDocRef, {
              exercises: updatedExercises,
            });

            const filteredData = updatedExercises.filter(
              (exercise: Exercise) =>
                t(`categories.${exercise.category}`) ===
                t(`categories.${category}`)
            );
            setData(filteredData);
            localStorage.setItem("exercisesData", JSON.stringify(filteredData));
            message.success(t("exerciseDeleted"));
          }
        }
      }
      setConfirm(false);
      setIsModalOpen(false);
    } catch (error) {
      message.error(t("errorDeletingExercise"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal
      open={isModalOpen}
      onCancel={(e) => {
        handleCancel(e);
        setIsModalOpen(false);
      }}
      footer={false}
    >
      <p className={styles.confirm}>{t("confirmDeletingExercise")}</p>
      <div className={styles.deleteSave}>
        <ResetButton
          children={t("delete")}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteCard(item.id);
          }}
          icon={<DeleteOutlined />}
        />
      </div>
    </CustomModal>
  );
};
