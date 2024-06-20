import React, { useEffect, useState } from "react";
import {
  Card,
  ConfigProvider,
  Empty,
  message,
  notification,
  Tooltip,
} from "antd";
import { useTranslation } from "react-i18next";
import { CloseCircleOutlined, StarFilled } from "@ant-design/icons";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { Exercise, ExercisesProps } from "../../../types/types";
import { Loader } from "../../../components/Loader/Loader";

import styles from "./Exercises.module.scss";

export const Exercises: React.FC<
  ExercisesProps & { updateTrigger: number }
> = ({ category, updateTrigger }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

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
          <SubTitle children={t("exercises")} className={styles.title} />
          <ConfigProvider
            theme={{
              components: {
                Card: {
                  headerFontSize: 20,
                  headerBg: "#1a1a1a",
                  colorTextHeading: "#ffffff",
                  fontSize: 16,
                  colorBorderSecondary: "#535353",
                },
              },
            }}
          >
            <Card
              title={t("chooseExercise")}
              className={styles.exercises}
              bordered={false}
            >
              {data.length > 0 ? (
                data.map((item) => (
                  <Card.Grid key={item.id}>
                    <div className={styles.icons}>
                      <Tooltip title={t("addToFavorite")}>
                        <StarFilled
                          className={`${styles.star} ${
                            isActive ? styles.active : ""
                          }`}
                          onClick={handleClick}
                        />
                      </Tooltip>
                      <Tooltip title={t("deleteExercise")}>
                        <CloseCircleOutlined
                          className={styles.delete}
                          onClick={() => handleDeleteCard(item.id)}
                        />
                      </Tooltip>
                    </div>
                    {item.name}
                  </Card.Grid>
                ))
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span style={{ color: "#ffffff" }}>{t("noData")}</span>
                  }
                />
              )}
            </Card>
          </ConfigProvider>
        </>
      )}
    </>
  );
};
