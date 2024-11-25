import { Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import { motion } from "framer-motion";

import { ICustomPasswrodInputProps } from "../../types/types";
import { animation, useAnimatedInView } from "../../hooks/useAnimatedInView ";

import styles from "./PasswordInput.module.scss";

export const ConfirmPasswordInput: React.FC<ICustomPasswrodInputProps> = ({
  onChange,
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
      className={styles.confirmInputWrapper}
    >
      <Form.Item
        label={
          <span className={styles.inputLabel}>
            {t("password")}
            <span className={styles.passwordRule}> {t("passwordRule")}</span>
          </span>
        }
        name="password"
        rules={[{ required: true }]}
      >
        <Input.Password
          autoComplete="new-password"
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
        name="confirm password"
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
              return Promise.reject(new Error(t("passwordNotMatch")));
            },
          }),
        ]}
      >
        <Input.Password
          autoComplete="new-password"
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
    </motion.div>
  );
};
