import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { CloseOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

import { SubTitle } from "../../../components/SubTitle/SubTitle";
import {
  animation,
  useAnimatedInView,
} from "../../../hooks/useAnimatedInView ";

import styles from "./FavoriteExercises.module.scss";

const CustomTitle: React.FC<{ text: string }> = ({ text }) => (
  <span style={{ color: "#0097B2", fontWeight: "700" }}>{text}</span>
);

const cardData: { title: string; content: string }[] = [
  { title: "Bench press", content: "Last set: 100 х 10" },
  { title: "Cable Fly", content: "Last set: 20 х 10" },
  { title: "Pec Deck", content: "Last set: 30 х 10" },
  { title: "Push ups", content: "Last set: 50" },
];

export const FavoriteExercises: React.FC = () => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();
  const [data, setData] = useState(cardData);

  const handleDeleteCard = (index: number) => {
    const newCardData = [...data];
    newCardData.splice(index, 1);
    setData(newCardData);
  };

  return (
    <>
      {data.length > 0 && (
        <>
          <SubTitle children={t("exercises")} className={styles.title} />
          <motion.div
            ref={ref}
            className={styles.info}
            initial="hidden"
            animate={controls}
            variants={animation}
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
  );
};
