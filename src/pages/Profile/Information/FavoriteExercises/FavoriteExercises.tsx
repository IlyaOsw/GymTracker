import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  RightOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Collapse, Empty, Tooltip, message } from "antd";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { SubTitle } from "../../../../components/SubTitle/SubTitle";
import { Exercise } from "../../../../types/types";
import { Loader } from "../../../../components/Loader/Loader";
import { ResetButton } from "../../../../components/ResetButton/ResetButton";
import { CustomModal } from "../../../../components/CustomModal/CustomModal";

import styles from "./FavoriteExercises.module.scss";

export const FavoriteExercises: React.FC = () => {
  const { t } = useTranslation();
  const [favoriteExercisesArray, setFavoriteExercisesArray] = useState<
    Exercise[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFavoriteExercises = async (user: any) => {
      setLoading(true);
      try {
        const db = getFirestore();
        const userId = user.uid;
        const exercisesDocRef = doc(db, "exercises", userId);
        const exercisesDoc = await getDoc(exercisesDocRef);

        if (exercisesDoc.exists()) {
          const exercisesData = exercisesDoc.data();
          const favoriteExercises = exercisesData.exercises
            .filter((exercise: Exercise) => exercise.isFavorite)
            .map((exercise: Exercise) => ({
              id: exercise.id,
              name: t(exercise.name),
              result: exercise.bestResult,
            }));
          setFavoriteExercisesArray(favoriteExercises);
        }
      } catch (error) {
        message.error(t("errorFetchingFavoriteExercises"));
      } finally {
        setLoading(false);
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchFavoriteExercises(user);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [t]);

  const handleCancel = () => setIsModalOpen(false);

  const handleConfirm = () => {
    setConfirm(true);
    setIsModalOpen(true);
  };

  const deleteFavoriteExercise = async (id: string) => {
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
          const updatedExercises = exercisesData.exercises.map(
            (exercise: Exercise) => {
              if (exercise.id === id) {
                return { ...exercise, isFavorite: false };
              }
              return exercise;
            }
          );

          await updateDoc(exercisesDocRef, {
            exercises: updatedExercises,
          });

          const updatedFavorites = updatedExercises.filter(
            (exercise: Exercise) => exercise.isFavorite
          );
          setFavoriteExercisesArray(updatedFavorites);
          message.success(t("removedFromFavorite"));
        }
      }
    } catch (error) {
      message.error(t("errorUpdatingFavorite"));
    }
  };

  const getItems = (item: Exercise) => [
    {
      key: item.id,
      label: <p>{item.name}</p>,
      children: (
        <>
          <span>{`${t("bestResult")} ${item.bestResult} ${t("kg")}`}</span>
          <div className={styles.deleteIcon}>
            <Tooltip
              title={t("deleteExerciseFromFavorites")}
              placement="bottom"
            >
              <CloseOutlined onClick={handleConfirm} />
            </Tooltip>
          </div>
          {confirm && (
            <CustomModal
              open={isModalOpen}
              onCancel={handleCancel}
              footer={false}
            >
              <p className={styles.confirm}>
                {t("confirmDeletingFromFavorite")}
              </p>
              <div className={styles.delete}>
                <ResetButton
                  children={t("delete")}
                  onClick={() => deleteFavoriteExercise(item.id)}
                  icon={<DeleteOutlined />}
                />
              </div>
            </CustomModal>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : favoriteExercisesArray.length > 0 ? (
        <div className={styles.exercises}>
          <SubTitle children={t("favoriteExercises")} />
          {favoriteExercisesArray.map((item) => (
            <Collapse
              key={item.id}
              defaultActiveKey={["1"]}
              bordered={false}
              expandIcon={({ isActive }) => (
                <RightOutlined rotate={isActive ? 90 : 0} />
              )}
              className={styles.collapse}
              items={getItems(item)}
            />
          ))}
        </div>
      ) : (
        <div className={styles.exercises}>
          <SubTitle children={t("favoriteExercises")} />
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span style={{ color: "#ffffff" }}>{t("noData")}</span>
            }
          />
        </div>
      )}
    </>
  );
};
