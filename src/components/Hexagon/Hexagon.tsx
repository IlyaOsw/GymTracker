import React from "react";
import { useTranslation } from "react-i18next";

import { HexagonProps } from "../../types/types";

import styles from "./Hexagon.module.scss";

export const Hexagon: React.FC<HexagonProps> = ({ text, className }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageContainer}>
        <img
          src={process.env.PUBLIC_URL + "/assets/Icons/Hexagon/Hexagon.svg"}
          alt="Hexagon"
          className={styles.hexagon}
        />
        <div className={`${styles.imageText} ${className}`}>{t(text)}</div>
      </div>
    </div>
  );
};
