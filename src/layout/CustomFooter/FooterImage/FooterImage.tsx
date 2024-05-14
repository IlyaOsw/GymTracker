import React from "react";
import { useTranslation } from "react-i18next";

import { DescriptionTitle } from "../../../components/DescriptionTitle/DescriptionTitle";

import styles from "./FooterImage.module.scss";

export const FooterImage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.footerImg}>
      <div className={styles.footerTitle}>
        <DescriptionTitle
          text={t("unlockYourPotential")}
          textAlign="center"
          className="animation_item"
        />
      </div>
      <div className={styles.image}></div>
    </div>
  );
};
