import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./Description.module.scss";

export const Description = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.description}>
      <h2 className={styles.descriptionTitle}>{t("descriptionTitle")}</h2>
      <h3 className={styles.descriptionText}>{t("descriptionText")}</h3>
    </div>
  );
};
