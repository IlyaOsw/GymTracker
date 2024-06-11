import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import { SubTitle } from "../../../../components/SubTitle/SubTitle";
import { FavoriteExercisesType } from "../../../../types/types";

import styles from "./FavoriteExercises.module.scss";

export const FavoriteExercises: React.FC = () => {
  const { t } = useTranslation();
  const [favoriteExercisesArray, setFavoriteExercisesArray] = useState<
    FavoriteExercisesType[]
  >([
    { id: 1, name: "Bench press", result: "125" },
    { id: 2, name: "Squat", result: "155" },
    { id: 3, name: "Deadlift", result: "180" },
  ]);

  const deleteFavoriteExercise = (id: number) => {
    setFavoriteExercisesArray((prevExercises) =>
      prevExercises.filter((exercise) => exercise.id !== id)
    );
  };

  return (
    <div className={styles.exercises}>
      <SubTitle children={t("favoriteExercises")} />
      {favoriteExercisesArray.map((item) => (
        <div key={item.id} className={styles.exercisesBox}>
          <div className={styles.exerciseName}>{item.name}</div>
          <div className={styles.exerciseResult}>
            {t("bestResult")} {item.result} {t("kg")}
          </div>
          <Tooltip title={t("deleteRow")}>
            <CloseCircleOutlined
              className={styles.deleteIcon}
              onClick={() => deleteFavoriteExercise(item.id)}
            />
          </Tooltip>
        </div>
      ))}
    </div>
  );
};
