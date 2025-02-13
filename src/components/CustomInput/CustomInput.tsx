import { Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import { FieldType } from "../../types/field";
import { ICustomInputProps } from "../../types/components/custom-input";
import { animation, useAnimatedInView } from "../../hooks/useAnimatedInView ";

import styles from "./CustomInput.module.scss";

export const CustomInput = <T extends string | number = string>({
  name,
  text,
  placeholder,
  isRequired = true,
  className,
  onChange,
  value,
}: ICustomInputProps<T>) => {
  const { ref, controls } = useAnimatedInView();
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue: T = e.target.value as T;

    if (typeof value === "number" && !isNaN(Number(e.target.value))) {
      inputValue = Number(e.target.value) as T;
    }

    if (onChange) {
      onChange(inputValue);
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
          placeholder={placeholder}
          className={`${styles.inputField} ${className}`}
          allowClear
          onChange={handleChange}
          value={value?.toString()}
          autoComplete="off"
        />
      </Form.Item>
    </motion.div>
  );
};
