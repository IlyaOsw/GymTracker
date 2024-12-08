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
import { IDeleteWorkoutProps } from "../../../../types/types";
import { CustomModal } from "../../../../components/CustomModal/CustomModal";
import { scrollToTop } from "../../../../utils/scrollToTop";
import { ClosableMessage } from "../../../../components/ClosableMessage/ClosableMessage";

import styles from "./DeleteWorkout.module.scss";

export const DeleteWorkout: React.FC<IDeleteWorkoutProps> = React.memo(
  ({
    workoutDate,
    selectedExercise,
    setData,
    setWorkoutDate,
    setSelectedExercise,
    setActiveCardId,
  }) => {
    const { t } = useTranslation();
    const user = getAuth().currentUser;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const deleteWorkoutByDate = async () => {
      if (!workoutDate || !selectedExercise || !user) return;

      const setsCollectionRef = collection(getFirestore(), "sets");
      const setDocRef = doc(setsCollectionRef, selectedExercise.id);

      try {
        const docSnapshot = await getDoc(setDocRef);
        if (docSnapshot.exists()) {
          const documentData = docSnapshot.data();
          const workouts = documentData.workouts || [];
          const filteredWorkouts = workouts.filter(
            (workout: { date: string | number | Date }) =>
              new Date(workout.date).toLocaleString() !== workoutDate
          );
          await updateDoc(setDocRef, { workouts: filteredWorkouts });

          setData([]);
          setWorkoutDate(null);
          setSelectedExercise(null);
          setActiveCardId(null);
          scrollToTop();
          setIsModalOpen(false);

          message.success({
            key: "limit-success",
            content: t("workoutDeleted"),
          });
        }
      } catch (error) {
        ClosableMessage({ type: "error", content: t("errorDeletingWorkout") });
      }
    };

    const confirmDelete = () => {
      if (!workoutDate || !selectedExercise) {
        ClosableMessage({ type: "error", content: t("noDataToDelete") });
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
        <div className={styles.deleteWorkout}>
          <ResetButton icon={<DeleteOutlined />} onClick={confirmDelete}>
            {t("deleteWorkout")}
          </ResetButton>
        </div>
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
  }
);
