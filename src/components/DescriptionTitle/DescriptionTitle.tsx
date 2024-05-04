import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./DescriptionTitle.module.scss";

interface CustomButtonProps {
  text: string;
  textAlign?: "start" | "center" | "end";
}

export const DescriptionTitle: React.FC<CustomButtonProps> = ({
  text,
  textAlign = "start",
}) => {
  const { t } = useTranslation();

  return (
    <h2 className={`${styles.descriptionTitle} ${styles[textAlign]}`}>
      {t(text)}
    </h2>
  );
};
