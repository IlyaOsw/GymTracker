import React from "react";
import { useTranslation } from "react-i18next";
import { Form } from "antd";
import { useForm } from "@formspree/react";
import { CustomFooter } from "layout/CustomFooter/CustomFooter";
import { PageWrapper } from "components/PageWrapper/PageWrapper";
import { DescriptionTitle } from "components/DescriptionTitle/DescriptionTitle";
import { SubTitle } from "components/SubTitle/SubTitle";
import { scrollToTop } from "utils/scrollToTop";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";

import styles from "./ContactUs.module.scss";
import { ContactForm } from "./ContactForm/ContactForm";

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
            <ContactForm state={state} />
          </Form>
        </div>
      </PageWrapper>
      <CustomFooter />
    </>
  );
};

export default ContactUs;
