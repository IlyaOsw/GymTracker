import React, { useEffect, useState } from "react";
import { Empty, message } from "antd";
import { useTranslation } from "react-i18next";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { Exercise, ExercisesProps } from "../../../types/types";
import { Loader } from "../../../components/Loader/Loader";
import { EmptyBox } from "../../../components/EmptyBox/EmptyBox";

import styles from "./Exercises.module.scss";
import { ExerciseCard } from "./ExerciseCard/ExerciseCard";

export const Exercises: React.FC<ExercisesProps> = ({
  category,
  updateTrigger,
  onSelectExercise,
}) => {
  const { t } = useTranslation();
  const [data, setData] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("exercisesData") || "[]"
    );
    if (storedData.length > 0) {
      setData(storedData);
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
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
            const filteredData = exercisesData.exercises
              .filter(
                (exercise: Exercise) =>
                  t(`categories.${exercise.category}`) ===
                  t(`categories.${category}`)
              )
              .map((exercise: Exercise) => ({
                id: exercise.id,
                name: t(exercise.name),
                category: exercise.category,
                bestResult: `${t("lastSet")}: ${exercise.bestResult}`,
                isFavorite: exercise.isFavorite,
              }));
            localStorage.setItem("exercisesData", JSON.stringify(filteredData));
            setData(filteredData);
          } else {
            setData([]);
          }
        }
        setLoading(false);
      } catch (error) {
        message.error(t("errorFetchingExercises"));
      }
    };
    fetchExercises();
  }, [category, t, updateTrigger]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <SubTitle children={t("exercises")} className={styles.title} />
          <div className={styles.description}>{t("chooseExercise")}</div>
          <div className={styles.cards}>
            {data.length ? (
              data.map((item: Exercise) => (
                <ExerciseCard
                  key={item.id}
                  item={item}
                  onSelectExercise={onSelectExercise}
                  category={category}
                  setData={setData}
                  setLoading={setLoading}
                />
              ))
            ) : (
              <EmptyBox />
            )}
          </div>
        </>
      )}
    </>
  );
};
