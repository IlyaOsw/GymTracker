import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import { IHexagonProps } from "../../types/components/hexagon";
import { animation, useAnimatedInView } from "../../hooks/useAnimatedInView ";

import styles from "./Hexagon.module.scss";

export const Hexagon: React.FC<IHexagonProps> = ({
  text,
  className,
  onClick,
}) => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animation}
      className={styles.wrapper}
    >
      <div className={styles.imageContainer} onClick={onClick}>
        <img
          src={process.env.PUBLIC_URL + "/assets/Icons/Hexagon/Hexagon.svg"}
          alt="Hexagon"
          className={styles.hexagon}
        />
        <span className={`${styles.imageText} ${className}`}>{t(text)}</span>
      </div>
    </motion.div>
  );
};
