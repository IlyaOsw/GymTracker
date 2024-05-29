import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import { Hexagon } from "../../../components/Hexagon/Hexagon";
import { SubTitle } from "../../../components/SubTitle/SubTitle";
import {
  animation,
  useAnimatedInView,
} from "../../../hooks/useAnimatedInView ";

import styles from "./Diary.module.scss";

export const Diary: React.FC = () => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();

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
        <Link to="/workout">
          <Hexagon text={t("arms")} className={styles.link} />
        </Link>
        <Link to="/workout">
          <Hexagon text={t("shoulders")} className={styles.link} />
        </Link>
        <Link to="/workout">
          <Hexagon text={t("chest")} className={styles.link} />
        </Link>
        <Link to="/workout">
          <Hexagon text={t("back")} className={styles.link} />
        </Link>
        <Link to="/workout">
          <Hexagon text={t("legs")} className={styles.link} />
        </Link>
      </div>
    </div>
  );
};
