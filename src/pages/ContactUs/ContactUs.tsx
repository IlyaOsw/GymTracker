import React from "react";
import { useTranslation } from "react-i18next";
import { Divider, Form, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useForm, ValidationError } from "@formspree/react";
import { CustomFooter } from "layout/CustomFooter/CustomFooter";
import { PageWrapper } from "components/PageWrapper/PageWrapper";
import { DescriptionTitle } from "components/DescriptionTitle/DescriptionTitle";
import { CustomInput } from "components/CustomInput/CustomInput";
import { SubTitle } from "components/SubTitle/SubTitle";
import { CustomButton } from "components/CustomButton/CustomButton";
import { scrollToTop } from "utils/scrollToTop";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";

import styles from "./ContactUs.module.scss";

const ContactUs: React.FC = () => {
  const { t } = useTranslation();
  const [state, handleSubmit] = useForm("mbljzqzg");

  const onSubmit = () => {
    scrollToTop();
    ClosableMessage({ type: "success", content: t("messageSended") });
  };

  return (
    <>
      <PageWrapper>
        <DescriptionTitle text={t("contactUs")} textAlign="center" />
        <div className={styles.wrapper}>
          <div className={styles.description}>
            <SubTitle>{t("getInTouch")}</SubTitle>
            <p>{t("weAreHereToHelp")}</p>
            <img
              src={process.env.PUBLIC_URL + "/assets/Images/Contact.jpg"}
              alt="Contact"
            />
            <p>{t("contactUsDescription")}</p>
          </div>
          <Form
            layout="vertical"
            onFinish={(values) => {
              handleSubmit(values);
              onSubmit();
            }}
          >
            <div className={styles.from}>
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
                <ValidationError
                  prefix="Email"
                  field="Email"
                  errors={state.errors}
                />
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
                  <span className={styles.inputLabel}>
                    {t("questionsComments")}
                  </span>
                }
                layout="vertical"
                name="Message"
                rules={[{ required: true, message: t("messageValidation") }]}
              >
                <Input.TextArea
                  placeholder={t("enterMessage")}
                  name="message"
                />
              </Form.Item>
              <ValidationError
                prefix="Message"
                field="Message"
                errors={state.errors}
              />
              <CustomButton
                icon={<SendOutlined />}
                htmlType="submit"
                className={styles.button}
              >
                {t("sendMessage")}
              </CustomButton>
            </div>
          </Form>
        </div>
      </PageWrapper>
      <CustomFooter />
    </>
  );
};

export default ContactUs;
