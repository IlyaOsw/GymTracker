import React from "react";
import { Collapse } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { TrainingHistoryPropsType } from "../../../../../types/types";
import { scrollToBottom } from "../../../../../utils/scrollToBottom";

import styles from "./TrainingHistory.module.scss";

export const TrainingHistory: React.FC<TrainingHistoryPropsType> = React.memo(
  ({ showHistory, workouts, workoutDates }) => {
    const { t } = useTranslation();

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString();
    };

    const sortedData = workoutDates
      .map((date, index) => ({ date, workout: workouts[index] }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const genExtra = () => (
      <img
        src={
          process.env.PUBLIC_URL + "/assets/Icons/AdditionalIcons/history.png"
        }
        alt="History"
      />
    );

    const items = sortedData.map((item, index) => ({
      key: index.toString(),
      label: (
        <p onClick={scrollToBottom}>
          <span className={styles.numberWrapper}>{index + 1}</span>
          {t("workoutFor")} <span> {formatDate(item.date)} </span>
        </p>
      ),
      children: (
        <div className={styles.historyWorkout}>
          <table>
            <thead>
              <tr>
                <th>{t("set")}</th>
                <th>{t("weight")}</th>
                <th>{t("reps")}</th>
              </tr>
            </thead>
            <tbody>
              {item.workout.map((w, i) => (
                <tr key={i}>
                  <td>{w.set}.</td>
                  <td>{w.weight}</td>
                  <td>{w.reps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
      extra: genExtra(),
    }));

    return (
      <div className={styles.container}>
        {showHistory && workouts.length > 0 && (
          <>
            <Collapse
              bordered={false}
              expandIcon={({ isActive }) => (
                <RightOutlined rotate={isActive ? 90 : 0} />
              )}
              items={items}
              className={styles.collapse}
            />
            <div className={styles.trainingHistory}>
              {t("limitTrainingHistory")}
            </div>
          </>
        )}
      </div>
    );
  }
);
