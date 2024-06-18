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

import { HexagonLinkProps } from "../../../types/types";

import styles from "./Diary.module.scss";

const HexagonLink: React.FC<HexagonLinkProps> = ({ text }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/workout", { state: { title: text } });
  };

  return (
    <div onClick={handleClick} className={styles.link}>
      <Hexagon text={text} />
    </div>
  );
};

export const Diary: React.FC = () => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();

  const categories = {
    Hands: t("Hands"),
    Shoulders: t("Shoulders"),
    Chest: t("Chest"),
    Back: t("Back"),
    Legs: t("Legs"),
  };

  return (
    <div className={styles.diaryWrapper}>
      <SubTitle children={t("trainingDiary")} />
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
        <HexagonLink text={categories.Hands} />
        <HexagonLink text={categories.Shoulders} />
        <HexagonLink text={categories.Chest} />
        <HexagonLink text={categories.Back} />
        <HexagonLink text={categories.Legs} />
      </div>
    </div>
  );
};
