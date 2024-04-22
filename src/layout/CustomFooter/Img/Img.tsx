import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./Img.module.scss";

export const Img: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.footerImg}>
      <div className={styles.footerTitle}>{t("unlockYourPotential")}</div>
      <img
        src={process.env.PUBLIC_URL + "/assets/Images/FooterImg.jpg"}
        alt="Footer"
      />
    </div>
  );
};
