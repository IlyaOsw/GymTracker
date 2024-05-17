import { Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import styles from "./PasswordInput.module.scss";

interface CustomPassInputProps {
  onChange?: (value: string) => void;
}

export const ConfirmPasswordInput: React.FC<CustomPassInputProps> = ({
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
    <div className={styles.confirmInputWrapper}>
      <Form.Item
        label={<span className={styles.inputLabel}>{t("password")}</span>}
        name="password"
        rules={[{ required: true }]}
      >
        <Input.Password
          className={styles.inputField}
          type="password"
          placeholder={t("enterPassword")}
          iconRender={(visible) =>
            visible ? (
              <EyeOutlined style={{ color: "white" }} />
            ) : (
              <EyeInvisibleOutlined style={{ color: "white" }} />
            )
          }
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        label={
          <span className={styles.inputLabel}>{t("confirmPassword")}</span>
        }
        name="password2"
        dependencies={["password"]}
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          className={styles.inputField}
          type="password"
          placeholder={t("enterConfirmPassword")}
          iconRender={(visible) =>
            visible ? (
              <EyeOutlined style={{ color: "white" }} />
            ) : (
              <EyeInvisibleOutlined style={{ color: "white" }} />
            )
          }
          onChange={handleChange}
        />
      </Form.Item>
    </div>
  );
};