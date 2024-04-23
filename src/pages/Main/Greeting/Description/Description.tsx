import React from "react";
import { useTranslation } from "react-i18next";

import { DescriptionTitle } from "../../../../components/DescriptionTitle/DescriptionTitle";
import { DescriptionText } from "../../../../components/DescriptionText/DescriptionText";

import styles from "./Description.module.scss";

export const Description = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.description}>
      <DescriptionTitle text={t("descriptionTitle")} textAlign="start" />
      <DescriptionText text={t("descriptionText")} textAlign="start" />
    </div>
  );
};
