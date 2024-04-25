import React from "react";
import { useTranslation } from "react-i18next";

import styles from "../About.module.scss";

export const DevelopedBy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.logo}>
      <img
        src={process.env.PUBLIC_URL + "/assets/Logo/LogoMainMobile.svg"}
        alt="Logo Mobile"
      />
      <span className={styles.logoDescription}>{t("developedBy")}</span>
    </div>
  );
};
