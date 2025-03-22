import React from "react";
import { useTranslation } from "react-i18next";
import { ValidationError } from "@formspree/react";
import { Divider, Form, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { SubTitle } from "components/SubTitle/SubTitle";
import { CustomInput } from "components/CustomInput/CustomInput";
import { CustomButton } from "components/CustomButton/CustomButton";
import { ContactFormPropsType } from "types/contact-form";

import styles from "../ContactUs.module.scss";

export const ContactForm: React.FC<ContactFormPropsType> = ({ state }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.form}>
      <SubTitle>{t("fullName")}</SubTitle>
      <div className={styles.container}>
        <CustomInput
          name="FirstName"
          text={t("firstName")}
          placeholder={t("enterFirstName")}
        />
        <ValidationError
          prefix="FirstName"
          field="FirstName"
          errors={state.errors}
        />
        <CustomInput
          name="LastName"
          text={t("lastName")}
          placeholder={t("enterLastName")}
        />
        <ValidationError
          prefix="LastName"
          field="LastName"
          errors={state.errors}
        />
      </div>
      <SubTitle>{t("contactInformation")}</SubTitle>
      <div className={styles.container}>
        <CustomInput
          name="Email"
          text={t("email")}
          placeholder={t("enterMail")}
        />
        <ValidationError prefix="Email" field="Email" errors={state.errors} />
        <CustomInput
          name="PhoneNumber"
          text={t("phone")}
          placeholder={t("enterPhone")}
        />
        <ValidationError
          prefix="Phone"
          field="PhoneNumber"
          errors={state.errors}
        />
      </div>
      <Divider style={{ backgroundColor: "gray" }} />
      <Form.Item
        label={
          <span className={styles.inputLabel}>{t("questionsComments")}</span>
        }
        layout="vertical"
        name="Message"
        rules={[{ required: true, message: t("messageValidation") }]}
      >
        <Input.TextArea placeholder={t("enterMessage")} name="message" />
      </Form.Item>
      <ValidationError prefix="Message" field="Message" errors={state.errors} />
      <CustomButton
        icon={<SendOutlined />}
        htmlType="submit"
        className={styles.button}
      >
        {t("sendMessage")}
      </CustomButton>
    </div>
  );
};
