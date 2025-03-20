import React from "react";
import { useTranslation } from "react-i18next";
import { WaterGenderPropsType } from "types/water-gender";

import styles from "../WaterCalculator.module.scss";

export const WaterGender: React.FC<WaterGenderPropsType> = ({
  gender,
  setGender,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.genderBlock}>
      <h4 className={styles.subtitle}>{t("yourGender")}</h4>
      <div className={styles.select}>
        <div
          className={`${styles.option} ${
            gender === "male" ? styles.active : ""
          }`}
          onClick={() => setGender("male")}
        >
          {t("male")}
        </div>
        <div
          className={`${styles.option} ${
            gender === "female" ? styles.active : ""
          }`}
          onClick={() => setGender("female")}
        >
          {t("female")}
        </div>
      </div>
    </div>
  );
};
