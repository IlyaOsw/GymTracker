import { Form, Input } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import styles from "./PasswordInput.module.scss";

export const ConfrimPasswordInput: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    const inputs = document.querySelectorAll<HTMLElement>(
      ".ant-input-password"
    );
    inputs.forEach((input) => {
      input.style.color = "rgb(167, 167, 167)";
      input.style.backgroundColor = "#141414";
    });
  }, []);

  return (
    <div className={styles.inputWrapper}>
      <Form
        form={form}
        name="dependencies"
        autoComplete="off"
        style={{ maxWidth: 600 }}
        layout="vertical"
      >
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
          />
        </Form.Item>
      </Form>
    </div>
  );
};
