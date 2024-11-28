import React from "react";
import { useTranslation } from "react-i18next";
import { Divider, Form, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";

import { CustomFooter } from "../../layout/CustomFooter/CustomFooter";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { SubTitle } from "../../components/SubTitle/SubTitle";
import { CustomButton } from "../../components/CustomButton/CustomButton";

import styles from "./ContactUs.module.scss";

const ContactUs: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageWrapper>
        <DescriptionTitle text={t("contact Us")} textAlign="center" />
        <div className={styles.wrapper}>
          <div className={styles.description}>
            <SubTitle>{t("getInTouch")}</SubTitle>
            <p>{t("weAreHereToHelp")}</p>
            <img
              src={process.env.PUBLIC_URL + `/assets/Images/contact.jpg`}
              alt="Contact"
            />
            <p>{t("contactUsDescription")}</p>
          </div>
          <div className={styles.from}>
            <SubTitle>{t("fullName")}</SubTitle>
            <div className={styles.container}>
              <CustomInput
                name={t("firstName")}
                text={t("firstName")}
                placeholder={t("enterFirstName")}
                onChange={() => console.log("ASD")}
              />
              <CustomInput
                name={t("lastName")}
                text={t("lastName")}
                placeholder={t("enterLastName")}
                onChange={() => console.log("ASD")}
              />
            </div>
            <SubTitle>{t("contactInformation")}</SubTitle>
            <div className={styles.container}>
              <CustomInput
                name="email"
                text={t("email")}
                placeholder={t("enterMail")}
                onChange={() => console.log("ASD")}
              />
              <CustomInput
                name="phone"
                text={t("phone")}
                placeholder={t("enterPhone")}
                onChange={() => console.log("ASD")}
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
              name="TextArea"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input.TextArea placeholder={t("enterMessage")} />
            </Form.Item>
            <CustomButton icon={<SendOutlined />}>
              {t("sendMessage")}
            </CustomButton>
          </div>
        </div>
      </PageWrapper>
      <CustomFooter />
    </>
  );
};

export default ContactUs;
