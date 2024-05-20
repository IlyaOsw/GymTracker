import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
          <CustomButton children={t("send")} className={styles.btn} />
        </div>
        <Link to="/signin">
          <CustomButton children={t("toSignIn")} className={styles.btnBack} />
        </Link>
      </PageWrapper>
      <CustomFooter />
    </>
  );
};
export default ResetPassword;
