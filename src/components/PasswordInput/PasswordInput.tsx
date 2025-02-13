import { Form, Input } from "antd";
import React from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { IPasswordInputProps } from "types/components/password-input";
import { animation, useAnimatedInView } from "hooks/useAnimatedInView ";
import { FieldType } from "types/field";

import styles from "./PasswordInput.module.scss";

export const PasswordInput: React.FC<IPasswordInputProps> = ({
  name,
  text,
  placeholder,
  onChange,
}) => {
  const { ref, controls } = useAnimatedInView();
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
        label={<span className={styles.inputLabel}>{text}</span>}
        name={name}
        rules={[{ required: true }]}
      >
        <Input.Password
          autoComplete="current-password"
          className={styles.inputField}
          placeholder={placeholder}
          onChange={handleChange}
          iconRender={(visible) =>
            visible ? (
              <EyeOutlined style={{ color: "white" }} />
            ) : (
              <EyeInvisibleOutlined style={{ color: "white" }} />
            )
          }
        />
      </Form.Item>
    </motion.div>
  );
};
