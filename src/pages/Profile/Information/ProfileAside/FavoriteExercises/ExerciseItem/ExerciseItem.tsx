import React from "react";
import { Collapse, CollapseProps } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import { IExerciseItemProps } from "../../../../../../types/types";
import { Hexagon } from "../../../../../../components/Hexagon/Hexagon";
import {
  animation,
  useAnimatedInView,
} from "../../../../../../hooks/useAnimatedInView ";

import styles from "./ExerciseItem.module.scss";

export const ExerciseItem: React.FC<IExerciseItemProps> = ({ item }) => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();

  const genExtra = () => (
    <img
      src={process.env.PUBLIC_URL + "/assets/Icons/AdditionalIcons/star.png"}
      alt="Star"
    />
  );

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <p>{item.name}</p>,
      children: (
        <>
          <div className={styles.title}>
            <img
              src={
                process.env.PUBLIC_URL +
                "/assets/Icons/AdditionalIcons/trophy.png"
              }
              alt="Trophy"
            />
            <span>{t("bestResult")}</span>
          </div>
          <div className={styles.result}>
            <div className={styles.hexagonWrapper}>
              <div className={styles.hexagonTitle}>{t("weight")}</div>
              <Hexagon text={item.bestResult.weight} />
            </div>
            <div className={styles.hexagonWrapper}>
              <div className={styles.hexagonTitle}>{t("reps")}</div>
              <Hexagon text={item.bestResult.reps} />
            </div>
          </div>
        </>
      ),
      extra: genExtra(),
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animation}
    >
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => (
          <RightOutlined rotate={isActive ? 90 : 0} />
        )}
        className={styles.collapse}
        items={items}
      />
    </motion.div>
  );
};
