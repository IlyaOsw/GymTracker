import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Hexagon } from "components/Hexagon/Hexagon";
import { SubTitle } from "components/SubTitle/SubTitle";
import { animation, useAnimatedInView } from "hooks/useAnimatedInView ";
import { IHexagonLinkProps } from "types/components/hexagon";
import { useAuth } from "context/AuthContext";

import styles from "./Diary.module.scss";

export const Diary: React.FC = React.memo(() => {
  const { t } = useTranslation();

  const { ref, controls } = useAnimatedInView();

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
        <HexagonLink text={t("Hands")} />
        <HexagonLink text={t("Delts")} />
        <HexagonLink text={t("Chest")} />
        <HexagonLink text={t("Back")} />
        <HexagonLink text={t("Legs")} />
      </div>
    </>
  );
});

const HexagonLink: React.FC<IHexagonLinkProps> = React.memo(({ text }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () =>
    navigate(`/workout/${user!.uid}`, { state: { title: text } });

  return (
    <div className={styles.link}>
      <Hexagon text={text} onClick={handleClick} />
    </div>
  );
});
