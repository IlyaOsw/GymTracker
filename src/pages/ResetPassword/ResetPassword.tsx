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
  const [email, setEmail] = useState<string>("");

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(getAuth(), email);
      ClosableMessage({ type: "success", content: t("passwordResetSuccess") });
    } catch (error) {
      ClosableMessage({ type: "error", content: t("passwordResetError") });
    }
  };

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
            onChange={(email: string) => setEmail(email)}
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
