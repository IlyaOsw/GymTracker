import React from "react";
import { useTranslation } from "react-i18next";

import { DescriptionTitle } from "../DescriptionTitle/DescriptionTitle";

import styles from "./FooterImage.module.scss";

export const FooterImage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.footerImg}>
      <div className={styles.footerTitle}>
        <DescriptionTitle text={t("unlockYourPotential")} textAlign="center" />
      </div>
      <img
        src={process.env.PUBLIC_URL + "/assets/Images/FooterImg.jpg"}
        alt="Footer"
      />
    </div>
  );
};
