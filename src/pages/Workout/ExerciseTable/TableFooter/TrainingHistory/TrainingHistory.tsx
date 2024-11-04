import React from "react";
import { Collapse } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { TrainingHistoryPropsType } from "../../../../../types/types";

import styles from "./TrainingHistory.module.scss";

export const TrainingHistory: React.FC<TrainingHistoryPropsType> = ({
  showHistory,
  workouts,
  workoutDates,
}) => {
  const { t } = useTranslation();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU");
  };

  const items = workoutDates
    .slice()
    .reverse()
    .map((date, dateIndex) => ({
      key: dateIndex.toString(),
      label: (
        <p>
          {t("workoutFor")} <span> {formatDate(date)} </span>
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
              {workouts[dateIndex].map((w, i) => (
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
    }));

  return (
    <>
      {showHistory && workouts.length > 0 && (
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) => (
            <RightOutlined rotate={isActive ? 90 : 0} />
          )}
          items={items}
          className={styles.collapse}
        />
      )}
    </>
  );
};
