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
  const [messageApi, contextHolder] = message.useMessage();

  const handleDeleteCard = async (exerciseId: string) => {
    setLoading(true);
    try {
      const user = getAuth().currentUser;
      if (user) {
        const userId = user.uid;
        const exercisesDocRef = doc(getFirestore(), "exercises", userId);
        const setsCollectionRef = doc(getFirestore(), "sets", exerciseId);
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
          }
        }
        messageApi.open({
          type: "success",
          content: t("exerciseDeleted"),
        });
      }
      setConfirm(false);
      setIsModalOpen(false);
      setLoading(false);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: t("errorDeletingExercise"),
      });
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
      {contextHolder}
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
