import { Form, Input } from "antd";
import React from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import styles from "./PasswordInput.module.scss";

type FieldType = {
  [key: string]: string | undefined;
  text?: string;
  password?: string;
  placeholder?: string;
};

export const PasswordInput: React.FC<FieldType> = ({
  name,
  text,
  placeholder,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <Form.Item<FieldType>
        label={<span className={styles.inputLabel}>{text}</span>}
        name={name}
        rules={[{ required: true }]}
      >
        <Input.Password
          className={styles.inputField}
          placeholder={placeholder}
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
