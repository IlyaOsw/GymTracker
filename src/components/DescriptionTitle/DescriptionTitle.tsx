import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./DescriptionTitle.module.scss";

interface CustomButtonProps {
  text: string;
  textAlign?: "start" | "center" | "end";
  className?: string;
}

export const DescriptionTitle: React.FC<CustomButtonProps> = ({
  text,
  textAlign = "start",
  className,
}) => {
  const { t } = useTranslation();

  return (
    <h2
      className={`${styles.descriptionTitle} ${styles[textAlign]} ${className}`}
    >
      {t(text)}
    </h2>
  );
};
