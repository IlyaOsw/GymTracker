import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./DescriptionText.module.scss";

interface CustomButtonProps {
  text: string;
  textAlign?: "start" | "center" | "end";
}

export const DescriptionText: React.FC<CustomButtonProps> = ({
  text,
  textAlign = "start",
}) => {
  const { t } = useTranslation();

  return (
    <h2
      className={`${styles.descriptionText} ${styles[textAlign]} animation_item`}
    >
      {t(text)}
    </h2>
  );
};
