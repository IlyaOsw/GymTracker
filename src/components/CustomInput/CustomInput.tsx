import { Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./CustomInput.module.scss";

interface CustomInputProps {
  text: string;
  type?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({ text, type }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.inputWrapper}>
      <p className={styles.inputLabel}>{t(text)}</p>
      <Input type={type} placeholder={text} className={styles.inputField} />
    </div>
  );
};
