import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import { Hexagon } from "../../../components/Hexagon/Hexagon";
import { SubTitle } from "../../../components/SubTitle/SubTitle";
import {
  animation,
  useAnimatedInView,
} from "../../../hooks/useAnimatedInView ";
import { IHexagonLinkProps } from "../../../types/types";

import styles from "./Diary.module.scss";

const HexagonLink: React.FC<IHexagonLinkProps> = React.memo(({ text }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate("/workout", { state: { title: text } });

  return (
    <div className={styles.link}>
      <Hexagon text={text} onClick={handleClick} />
    </div>
  );
});

export const Diary: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();

  // const categories = {
  //   Hands: t("Hands"),
  //   Shoulders: t("Shoulders"),
  //   Chest: t("Chest"),
  //   Back: t("Back"),
  //   Legs: t("Legs"),
  // };

  return (
    <>
      <SubTitle children={t("trainingDiary")} className={styles.header} />
      <motion.div
        ref={ref}
        className={styles.info}
        initial="hidden"
        animate={controls}
        variants={animation}
      >
        {t("diaryChoose")}
      </motion.div>
      <div className={styles.hexagonWrapper}>
        {/* <HexagonLink text={categories.Hands} />
        <HexagonLink text={categories.Shoulders} />
        <HexagonLink text={categories.Chest} />
        <HexagonLink text={categories.Back} />
        <HexagonLink text={categories.Legs} /> */}
        <HexagonLink text={t("Hands")} />
        <HexagonLink text={t("Shoulders")} />
        <HexagonLink text={t("Chest")} />
        <HexagonLink text={t("Back")} />
        <HexagonLink text={t("Legs")} />
      </div>
    </>
  );
});
