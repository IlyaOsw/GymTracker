import { Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./CustomInput.module.scss";

interface CustomInputProps {
  name?: string;
  text: string;
  type?: string;
  placeholder?: string;
  isRequired?: boolean;
  className?: string;
  onChange?: (value: string) => void;
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
  className,
  onChange,
}) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (onChange) {
      onChange(value);
    }
  };

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
          className={`${styles.inputField} ${className}`}
          allowClear
          onChange={handleChange}
          autoComplete="username"
        />
      </Form.Item>
    </div>
  );
};