import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Empty } from "antd";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { StarFilled } from "@ant-design/icons";

import { Exercise } from "../../../../../types/types";
import { Loader } from "../../../../../components/Loader/Loader";
import { SubTitle } from "../../../../../components/SubTitle/SubTitle";
import { ClosableMessage } from "../../../../../components/ClosableMessage/ClosableMessage";

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
        const exercisesDocRef = doc(getFirestore(), "exercises", user.uid);
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
          setLoading(false);
        }
      } catch (error) {
        ClosableMessage({
          type: "error",
          content: t("errorFetchingFavoriteExercises"),
        });
      }
    };

    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        fetchFavoriteExercises(user);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [t]);

  const renderStars = () => {
    const totalStars = 3;
    const filledStars = favoriteExercisesArray.length;
    return Array.from({ length: totalStars }, (_, index) => (
      <StarFilled
        key={index}
        className={index < filledStars ? styles.filledStar : styles.emptyStar}
      />
    ));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : favoriteExercisesArray.length > 0 ? (
        <div className={styles.exercises}>
          <SubTitle children={t("favoriteExercises")} />
          <div className={styles.starIcon}>{renderStars()}</div>
          {favoriteExercisesArray.map((item) => (
            <ExerciseItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className={styles.exercises}>
          <SubTitle children={t("favoriteExercises")} />
          <div className={styles.starIcon}>{renderStars()}</div>
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
