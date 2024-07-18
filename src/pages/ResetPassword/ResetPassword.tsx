import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { message } from "antd";

import { CustomFooter } from "../../layout/CustomFooter/CustomFooter";
import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { DescriptionText } from "../../components/DescriptionText/DescriptionText";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { CustomButton } from "../../components/CustomButton/CustomButton";

import styles from "./ResetPassword.module.scss";

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const auth = getAuth();
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      messageApi.open({
        type: "success",
        content: t("passwordResetSuccess"),
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: t("passwordResetError"),
      });
    }
  };

  const handleEmailChange = (email: string) => setEmail(email);

  return (
    <>
      {contextHolder}
      <PageWrapper>
        <DescriptionTitle
          text={t("resetPassword")}
          textAlign="center"
          className={styles.title}
        />
        <DescriptionText text={t("emailForReset")} textAlign="center" />
        <div className={styles.input}>
          <CustomInput
            name="email"
            text={t("email")}
            placeholder={t("enterMail")}
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <CustomButton
          children={t("send")}
          className={styles.btn}
          onClick={handleResetPassword}
        />
      </PageWrapper>
      <CustomFooter />
    </>
  );
};

export default ResetPassword;
