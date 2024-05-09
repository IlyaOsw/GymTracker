import React from "react";
import { useTranslation } from "react-i18next";
import { EditOutlined } from "@ant-design/icons";

import { SubTitle } from "../../../../components/SubTitle/SubTitle";

import styles from "./FavoriteExercises.module.scss";

export const FavoriteExercises: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.exercises}>
      <SubTitle children={t("favoriteExercises")} />
      <div className={styles.exercisesBox}>
        <div className={styles.exerciseName}>Deadlift</div>
        <div className={styles.exerciseResult}>
          {t("bestResult")} 180 {t("kg")}
        </div>
        <EditOutlined className={styles.editIcon} />
      </div>
      <div className={styles.exercisesBox}>
        <div className={styles.exerciseName}>Squat</div>
        <div className={styles.exerciseResult}>
          {t("bestResult")} 155 {t("kg")}
        </div>
        <EditOutlined className={styles.editIcon} />
      </div>
      <div className={styles.exercisesBox}>
        <div className={styles.exerciseName}>Bench press</div>
        <div className={styles.exerciseResult}>
          {t("bestResult")} 125 {t("kg")}
        </div>
        <EditOutlined className={styles.editIcon} />
      </div>
    </div>
  );
};
