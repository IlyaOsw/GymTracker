import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { Exercise, ExercisesProps } from "../../../types/types";
import { Loader } from "../../../components/Loader/Loader";
import { EmptyBox } from "../../../components/EmptyBox/EmptyBox";
import { ClosableMessage } from "../../../components/ClosableMessage/ClosableMessage";
import i18n from "../../../i18n";

import styles from "./Exercises.module.scss";
import { ExerciseCard } from "./ExerciseCard/ExerciseCard";

export const Exercises: React.FC<ExercisesProps> = ({
  category,
  updateTrigger,
  onSelectExercise,
  exercisesRef,
  activeCardId,
  setActiveCardId,
  setSelectedExercise,
  data,
  setData,
}) => {
  const user = getAuth().currentUser;
  const { t } = useTranslation();
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
        if (user) {
          const exercisesDocRef = doc(getFirestore(), "exercises", user.uid);
          const exercisesDoc = await getDoc(exercisesDocRef);

          if (exercisesDoc.exists()) {
            const exercisesData = exercisesDoc.data();
            const categoryTranslated = t(category);

            const filteredData = exercisesData.exercises.filter(
              (exercise: Exercise) => {
                const exerciseCategoryTranslated = t(exercise.category);

                return exerciseCategoryTranslated === categoryTranslated;
              }
            );

            localStorage.setItem("exercisesData", JSON.stringify(filteredData));
            setData(filteredData);
          }
        }
        setLoading(false);
      } catch (error) {
        ClosableMessage({
          type: "error",
          content: t("errorFetchingExercises"),
        });
      }
    };

    fetchExercises();
  }, [category, t, updateTrigger, i18n.language]);

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
                  exercisesRef={exercisesRef}
                  setSelectedExercise={setSelectedExercise}
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
