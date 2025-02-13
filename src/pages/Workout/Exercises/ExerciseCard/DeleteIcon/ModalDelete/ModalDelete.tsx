import React from "react";
import { useTranslation } from "react-i18next";
import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { IExercise } from "types/exercise";
import { scrollToTop } from "utils/scrollToTop";
import { ModalDeletePropsType } from "types/modal-delete";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";
import { ConfirmDeleteModal } from "components/ConfirmDeleteModal/ConfirmDeleteModal";

export const ModalDelete: React.FC<ModalDeletePropsType> = React.memo(
  ({
    setLoading,
    setIsModalOpen,
    category,
    setData,
    isModalOpen,
    handleCancel,
    item,
    setConfirm,
    setSelectedExercise,
  }) => {
    const { t } = useTranslation();
    const user = getAuth().currentUser;

    const handleDeleteCard = async (exerciseId: string) => {
      setLoading(true);
      try {
        if (user) {
          const exercisesDocRef = doc(getFirestore(), "exercises", user.uid);
          const setsCollectionRef = doc(getFirestore(), "sets", exerciseId);
          const exercisesDoc = await getDoc(exercisesDocRef);

          await deleteDoc(setsCollectionRef);
          if (exercisesDoc.exists()) {
            const exercisesData = exercisesDoc.data();
            let updatedExercises: IExercise[] = [];

            if (exercisesData && exercisesData.exercises) {
              updatedExercises = exercisesData.exercises.filter(
                (exercise: IExercise) => exercise.id !== exerciseId
              );

              await updateDoc(exercisesDocRef, {
                exercises: updatedExercises,
              });
              const filteredData = updatedExercises.filter(
                (exercise: IExercise) => t(exercise.category) === t(category)
              );
              setData(filteredData);
            }
          }
          setConfirm(false);
          setIsModalOpen(false);
          setLoading(false);
          setSelectedExercise(null);
          scrollToTop();
          ClosableMessage({ type: "success", content: t("exerciseDeleted") });
        }
      } catch (error) {
        ClosableMessage({ type: "error", content: t("errorDeletingExercise") });
      }
    };

    return (
      <ConfirmDeleteModal
        text={t("confirmDeletingExercise")}
        onClick={(e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          handleDeleteCard(item.id);
        }}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    );
  }
);
