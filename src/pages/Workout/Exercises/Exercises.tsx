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
            const categoryTranslated = t(category); // Получаем перевод текущей категории с учетом языка

            const filteredData = exercisesData.exercises.filter(
              (exercise: Exercise) => {
                const exerciseCategoryTranslated = t(exercise.category); // Переводим категорию упражнения
                console.log(
                  "Exercise category (translated):",
                  exerciseCategoryTranslated
                );
                console.log(
                  "Current selected category (translated):",
                  categoryTranslated
                );

                // Сравниваем переводы
                return exerciseCategoryTranslated === categoryTranslated;
              }
            );

            console.log(
              "Filtered data after fetch with language:",
              i18n.language,
              filteredData
            );
            localStorage.setItem("exercisesData", JSON.stringify(filteredData));
            setData(filteredData);
          } else {
            console.log("No exercises found in Firestore for user.");
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exercises:", error);
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
