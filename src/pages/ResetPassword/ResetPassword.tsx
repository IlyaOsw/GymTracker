import React from "react";
import { useTranslation } from "react-i18next";

import { CustomFooter } from "../../layout/CustomFooter/CustomFooter";
import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { DescriptionText } from "../../components/DescriptionText/DescriptionText";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { CustomButton } from "../../components/CustomButton/CustomButton";

import styles from "./ResetPassword.module.scss";

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();
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
          />
        </div>
        <CustomButton children={t("send")} className={styles.btn} />
      </PageWrapper>
      <CustomFooter />
    </>
  );
};
export default ResetPassword;
