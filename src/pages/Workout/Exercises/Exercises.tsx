import React, { useEffect, useState } from "react";
import { Card, message, notification, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { CloseOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { Exercise, ExercisesProps } from "../../../types/types";
import { Loader } from "../../../components/Loader/Loader";

import styles from "./Exercises.module.scss";

const CustomTitle: React.FC<{ text: string }> = ({ text }) => (
  <span style={{ color: "#0097B2", fontWeight: "700" }}>{text}</span>
);

export const Exercises: React.FC<
  ExercisesProps & { updateTrigger: number }
> = ({ category, updateTrigger }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleDeleteCard = async (exerciseId: string) => {
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
          let updatedExercises: Exercise[] = [];

          if (exercisesData && exercisesData.exercises) {
            updatedExercises = exercisesData.exercises.filter(
              (exercise: Exercise) => exercise.id !== exerciseId
            );

            await updateDoc(exercisesDocRef, {
              exercises: updatedExercises,
            });
            message.success(t("exerciseDeleted"));

            const translatedCategory = t(`categories.${category}`);
            const filteredData = updatedExercises.filter(
              (exercise: Exercise) =>
                t(`categories.${exercise.category}`) === translatedCategory
            );
            setData(filteredData);
          }
        }
      } else {
        message.error(t("userNotAuthenticated"));
      }
    } catch (error) {
      message.error(t("errorDeletingExercise"));
    } finally {
      setLoading(false);
    }
  };

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
            const translatedCategory = t(`categories.${category}`);
            const filteredData = exercisesData.exercises
              .filter(
                (exercise: Exercise) =>
                  t(`categories.${exercise.category}`) === translatedCategory
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
      } catch (error) {
        notification.error({ message: t("errorFetchingExercises") });
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [category, t, updateTrigger]);

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("exercisesData") || "[]"
    );

    if (storedData.length > 0) {
      setData(storedData);
      setLoading(false);
    }
  }, [category]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {data.length > 0 && (
            <>
              <SubTitle children={t("exercises")} className={styles.title} />
              <motion.div
                className={styles.info}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1 } }}
              >
                {t("chooseExercise")}
              </motion.div>
              <div className={styles.favoriteExercises}>
                {data.map((item) => (
                  <Card
                    key={item.id}
                    title={
                      <>
                        <CustomTitle text={item.name} />
                        <Tooltip title={t("deleteExercise")}>
                          <CloseOutlined
                            className={styles.deleteIcon}
                            onClick={() => handleDeleteCard(item.id)}
                          />
                        </Tooltip>
                      </>
                    }
                    className={styles.usedItem}
                    bordered={false}
                  >
                    {item.bestResult}
                  </Card>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
