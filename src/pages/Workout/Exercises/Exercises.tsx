import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";

import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { Exercise, ExercisesProps } from "../../../types/types";
import { Loader } from "../../../components/Loader/Loader";
import { EmptyBox } from "../../../components/EmptyBox/EmptyBox";
import { ClosableMessage } from "../../../components/ClosableMessage/ClosableMessage";
import {
  animation,
  useAnimatedInView,
} from "../../../hooks/useAnimatedInView ";

import { ExerciseCard } from "./ExerciseCard/ExerciseCard";
import styles from "./Exercises.module.scss";

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
  const { ref, controls } = useAnimatedInView();
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
  }, [category, setData]);

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        if (user) {
          const exercisesDoc = await getDoc(
            doc(getFirestore(), "exercises", user.uid)
          );

          if (exercisesDoc.exists()) {
            const exercisesData = exercisesDoc.data();
            const filteredData = exercisesData.exercises.filter(
              (exercise: Exercise) => {
                const exerciseCategoryTranslated = t(exercise.category);
                return exerciseCategoryTranslated === t(category);
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
  }, [category, t, updateTrigger, user, setData]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <SubTitle children={t("exercises")} className={styles.title} />
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={animation}
            className={styles.description}
          >
            {t("chooseExercise")}
          </motion.div>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={animation}
            className={styles.cards}
          >
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
          </motion.div>
        </>
      )}
    </>
  );
};
