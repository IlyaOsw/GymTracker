import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./Loader.module.scss";

export const Loader: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <span className={styles.loader}></span>
      <span className={styles.text}>{t("loading")}</span>
    </div>
  );
};
