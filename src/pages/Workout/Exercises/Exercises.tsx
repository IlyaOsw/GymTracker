import React, { useEffect, useState } from "react";
import { message } from "antd";
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
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

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
        const user = getAuth().currentUser;
        if (user) {
          const exercisesDocRef = doc(getFirestore(), "exercises", user.uid);
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
          }
        }
        setLoading(false);
      } catch (error) {
        messageApi.open({
          type: "error",
          content: t("errorFetchingExercises"),
        });
      }
    };
    fetchExercises();
  }, [category, t, updateTrigger]);

  return (
    <>
      {contextHolder}
      {loading ? (
        <Loader />
      ) : (
        <>
          <SubTitle children={t("exercises")} className={styles.title} />
          <div className={styles.description}>{t("chooseExercise")}</div>
          <div className={styles.cards}>
            {data.length ? (
              data.map((item: Exercise, index) => (
                <ExerciseCard
                  key={item.id}
                  item={item}
                  onSelectExercise={onSelectExercise}
                  category={category}
                  setData={setData}
                  setLoading={setLoading}
                  activeCardId={activeCardId}
                  setActiveCardId={setActiveCardId}
                  index={index}
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
