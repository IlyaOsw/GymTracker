import React from "react";
import { Collapse, CollapseProps } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { ExerciseItemProps } from "../../../../../types/types";

import styles from "./ExerciseItem.module.scss";

export const ExerciseItem: React.FC<ExerciseItemProps> = ({ item }) => {
  const { t } = useTranslation();

  const genExtra = () => (
    <img
      src={process.env.PUBLIC_URL + "/assets/Icons/AdditionalIcons/star.png"}
    />
  );

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <p>{item.name}</p>,
      children: (
        <>
          <div className={styles.resultTitle}>{t("bestResult")}</div>
          <div className={styles.bestResult}>
            <div>
              <div className={styles.result}>
                {item.bestResult.weight} {t("kg")}
              </div>
            </div>
            <div>
              <div className={styles.result}>
                {item.bestResult.reps} {t("bestResultReps")}
              </div>
            </div>
          </div>
        </>
      ),
      extra: genExtra(),
    },
  ];

  return (
    <Collapse
      key={item.id}
      bordered={false}
      expandIcon={({ isActive }) => (
        <RightOutlined rotate={isActive ? 90 : 0} />
      )}
      className={styles.collapse}
      items={items}
    />
  );
};
