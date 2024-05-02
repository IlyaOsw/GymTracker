import { Form, Input } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import styles from "./CustomInput.module.scss";

interface CustomInputProps {
  name?: string;
  text: string;
  type?: string;
  placeholder?: string;
  isRequired?: boolean;
}

type FieldType = {
  [key: string]: string | undefined;
  username?: string;
  password?: string;
};

export const CustomInput: React.FC<CustomInputProps> = ({
  name,
  text,
  type,
  placeholder,
  isRequired = true,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    const inputs = document.querySelectorAll<HTMLElement>(
      ".ant-input-outlined"
    );
    inputs.forEach((input) => {
      input.style.backgroundColor = "#141414";
    });
  }, []);

  return (
    <div className={styles.inputWrapper}>
      <Form.Item<FieldType>
        label={<span className={styles.inputLabel}>{t(text)}</span>}
        name={name}
        rules={[{ required: isRequired }]}
      >
        <Input
          type={type}
          placeholder={placeholder}
          className={styles.inputField}
          allowClear
        />
      </Form.Item>
    </div>
  );
};
