import React from "react";

import { useTranslation } from "react-i18next";

import { SubTitle } from "../../../components/SubTitle/SubTitle";

import styles from "./Calculator.module.scss";

export const Calculator: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.calcWrapper}>
      <SubTitle children={t("weightCalculator")} />
      <div className={styles.info}>{t("indicateWeightAndReps")}</div>
      <div className={styles.calc}></div>
    </div>
  );
};
