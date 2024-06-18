import React, { useEffect, useState } from "react";
import { Card, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { CloseOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { Exercise, ExercisesProps } from "../../../types/types";
import { Loader } from "../../../components/Loader/Loader";

import styles from "./Exercises.module.scss";

const CustomTitle: React.FC<{ text: string }> = ({ text }) => (
  <span style={{ color: "#0097B2", fontWeight: "700" }}>{text}</span>
);

export const Exercises: React.FC<ExercisesProps> = ({ category }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<{ title: string; content: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleDeleteCard = (index: number) => {
    const newCardData = [...data];
    newCardData.splice(index, 1);
    setData(newCardData);
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
            console.log(translatedCategory);
            const filteredData = exercisesData.exercises
              .filter(
                (exercise: Exercise) =>
                  t(`categories.${exercise.category}`) === translatedCategory
              )
              .map((exercise: Exercise) => ({
                title: t(exercise.name),
                content: `${t("lastSet")}: ${exercise.bestResult}`,
              }));
            localStorage.setItem("exercisesData", JSON.stringify(filteredData));
            setData(filteredData);
          }
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [category, t]);
  useEffect(() => {
    console.log("Component mounted or category changed:", category);

    const storedData = JSON.parse(
      localStorage.getItem("exercisesData") || "[]"
    );
    console.log("Data from localStorage:", storedData);

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
                {data.map((item, index) => (
                  <Card
                    key={index}
                    title={
                      <>
                        <CustomTitle text={item.title} />
                        <Tooltip title={t("deleteExercise")}>
                          <CloseOutlined
                            className={styles.deleteIcon}
                            onClick={() => handleDeleteCard(index)}
                          />
                        </Tooltip>
                      </>
                    }
                    className={styles.usedItem}
                    bordered={false}
                  >
                    {item.content}
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
