import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  collection,
  getFirestore,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { message } from "antd";
import { getAuth } from "firebase/auth";

import { ResetButton } from "../../../../components/ResetButton/ResetButton";
import { DeleteWorkoutProps } from "../../../../types/types";
import { CustomModal } from "../../../../components/CustomModal/CustomModal";

import styles from "./DeleteWorkout.module.scss";

export const DeleteWorkout: React.FC<DeleteWorkoutProps> = ({
  workoutDate,
  selectedExercise,
  setData,
  setWorkoutDate,
}) => {
  const { t } = useTranslation();
  const user = getAuth().currentUser;
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const deleteWorkoutByDate = async () => {
    setIsModalOpen(true);
    if (!workoutDate || !selectedExercise || !user) return;

    const setsCollectionRef = collection(getFirestore(), "sets");
    const setDocRef = doc(setsCollectionRef, selectedExercise.id);

    try {
      const docSnapshot = await getDoc(setDocRef);
      if (docSnapshot.exists()) {
        const documentData = docSnapshot.data();
        const workouts = documentData.workouts || [];
        const filteredWorkouts = workouts.filter(
          (workout: any) =>
            new Date(workout.date).toLocaleString() !== workoutDate
        );

        await updateDoc(setDocRef, { workouts: filteredWorkouts });
        setData([]);
        setWorkoutDate(null);

        messageApi.open({
          type: "success",
          content: t("workoutDeleted"),
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: t("errorDeletingWorkout"),
      });
    }
  };

  const confirmDelete = () => {
    if (!workoutDate || !selectedExercise) {
      messageApi.open({
        type: "error",
        content: t("noDataToDelete"),
      });
      return;
    }
    setIsModalOpen(true);
  };

  const deleteWorkout = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    deleteWorkoutByDate();
  };

  return (
    <>
      {contextHolder}
      <ResetButton icon={<DeleteOutlined />} onClick={confirmDelete}>
        {t("deleteWorkout")}
      </ResetButton>
      <CustomModal
        open={isModalOpen}
        onCancel={(e) => {
          setIsModalOpen(false);
        }}
        footer={false}
      >
        <p className={styles.confirm}>{t("confirmDeletingWorkout")}</p>
        <div className={styles.deleteBtn}>
          <ResetButton
            children={t("delete")}
            onClick={deleteWorkout}
            icon={<DeleteOutlined />}
          />
        </div>
      </CustomModal>
    </>
  );
};
