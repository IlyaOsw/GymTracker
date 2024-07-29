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
          <div className={styles.result}>
            <div>{t("bestResult")}</div>
            <div>
              {item.bestResult.weight} {t("kg")} x {item.bestResult.reps}
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
