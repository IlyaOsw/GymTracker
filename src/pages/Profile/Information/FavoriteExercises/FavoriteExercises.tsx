import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Empty, message } from "antd";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

import { Exercise } from "../../../../types/types";
import { Loader } from "../../../../components/Loader/Loader";
import { SubTitle } from "../../../../components/SubTitle/SubTitle";

import styles from "./FavoriteExercises.module.scss";
import { ExerciseItem } from "./ExerciseItem/ExerciseItem";

export const FavoriteExercises: React.FC = () => {
  const { t } = useTranslation();
  const [favoriteExercisesArray, setFavoriteExercisesArray] = useState<
    Exercise[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavoriteExercises = async (user: User) => {
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
              bestResult: exercise.bestResult,
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

  const handleDelete = async (id: string) => {
    try {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const exercisesDocRef = doc(db, "exercises", user.uid);
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
          await updateDoc(exercisesDocRef, { exercises: updatedExercises });
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : favoriteExercisesArray.length > 0 ? (
        <div className={styles.exercises}>
          <SubTitle children={t("favoriteExercises")} />
          {favoriteExercisesArray.map((item) => (
            <ExerciseItem key={item.id} item={item} onDelete={handleDelete} />
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
