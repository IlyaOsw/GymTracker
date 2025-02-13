import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { SendOutlined } from "@ant-design/icons";
import { CustomFooter } from "layout/CustomFooter/CustomFooter";
import { DescriptionTitle } from "components/DescriptionTitle/DescriptionTitle";
import { DescriptionText } from "components/DescriptionText/DescriptionText";
import { CustomInput } from "components/CustomInput/CustomInput";
import { PageWrapper } from "components/PageWrapper/PageWrapper";
import { CustomButton } from "components/CustomButton/CustomButton";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";

import styles from "./ResetPassword.module.scss";

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();

  const auth = getAuth();
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      ClosableMessage({ type: "success", content: t("passwordResetSuccess") });
    } catch (error) {
      ClosableMessage({ type: "error", content: t("passwordResetError") });
    }
  };

  const handleEmailChange = (email: string) => setEmail(email);

  return (
    <>
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
          icon={<SendOutlined />}
        />
      </PageWrapper>
      <CustomFooter />
    </>
  );
};

export default ResetPassword;
