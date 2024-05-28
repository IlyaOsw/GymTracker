import { Form, Input } from "antd";
import React from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import { FieldType, PasswordInputProps } from "../../types/types";

import styles from "./PasswordInput.module.scss";

export const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  text,
  placeholder,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={styles.inputWrapper}>
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
    </div>
  );
};
