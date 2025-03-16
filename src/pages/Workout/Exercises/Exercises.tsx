import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useAuth } from "context/AuthContext";
import { motion } from "framer-motion";
import { Divider, Empty } from "antd";
import { SubTitle } from "components/SubTitle/SubTitle";
import { Loader } from "components/Loader/Loader";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";
import { animation, useAnimatedInView } from "hooks/useAnimatedInView ";
import { IExercise, IExercisesProps } from "types/exercise";

import styles from "./Exercises.module.scss";
import { ExerciseCard } from "./ExerciseCard/ExerciseCard";

export const Exercises: React.FC<IExercisesProps> = React.memo(
  ({
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
    const { user } = useAuth();
    const { ref, controls } = useAnimatedInView();
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchExercises = async () => {
        setLoading(true);
        try {
          if (user) {
            const exercisesDoc = await getDoc(
              doc(getFirestore(), "exercises", user.uid)
            );

            if (exercisesDoc.exists()) {
              const filteredData = exercisesDoc
                .data()
                .exercises.filter((exercise: IExercise) => {
                  const exerciseCategoryTranslated = t(exercise.category);
                  return exerciseCategoryTranslated === t(category);
                });
              setData(filteredData);
            }
          }
        } catch (error) {
          ClosableMessage({
            type: "error",
            content: t("errorFetchingExercises"),
          });
        } finally {
          setLoading(false);
        }
      };

      fetchExercises();
    }, [category, t, updateTrigger, user, setData]);

    return (
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
        {loading ? (
          <Loader />
        ) : (
          <div className={styles.cards}>
            {data.length ? (
              data.map((item: IExercise, index) => (
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
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span style={{ color: "#ffffff" }}>
                    {t("noFavoriteExercises")}
                  </span>
                }
              />
            )}
          </div>
        )}
        <Divider style={{ backgroundColor: "gray" }} />
      </>
    );
  }
);
