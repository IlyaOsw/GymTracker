import { Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import { CustomInputProps, FieldType } from "../../types/types";
import { animation, useAnimatedInView } from "../../hooks/useAnimatedInView ";

import styles from "./CustomInput.module.scss";

export const CustomInput: React.FC<CustomInputProps> = ({
  name,
  text,
  type,
  placeholder,
  isRequired = true,
  className,
  onChange,
  value,
}) => {
  const { ref, controls } = useAnimatedInView();
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animation}
      className={styles.inputWrapper}
    >
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
          value={value}
          autoComplete="off"
        />
      </Form.Item>
    </motion.div>
  );
};
