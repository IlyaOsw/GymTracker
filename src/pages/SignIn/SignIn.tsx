import React, { useEffect } from "react";
import { Checkbox } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FooterImage } from "../../components/FooterImage/FooterImage";
import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";

import styles from "./SignIn.module.scss";

const container: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const SignIn: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <div style={container}>
        <DescriptionTitle text={t("signIn")} textAlign="center" />
        <div className={styles.form}>
          <CustomInput
            name={t("email")}
            text={t("email")}
            placeholder={t("enterMail")}
          />
          <PasswordInput
            name={t("password")}
            text={t("password")}
            placeholder={t("enterPassword")}
          />
          <div className={styles.options}>
            <Checkbox className={styles.checkboxRemember}>
              {t("rememberMe")}
            </Checkbox>
            <div className={styles.importantOption}>{t("forgotPassword")}</div>
          </div>
          <Link to="/profile">
            <CustomButton className={styles.signInBtn}>
              {t("signIn")}
            </CustomButton>
          </Link>
          <div className={styles.options}>
            <div className={styles.notRegistered}>{t("notRegistered")}</div>
            <Link to="/signup">
              <div className={styles.importantOption}>
                {t("createAnAccount")}
              </div>
            </Link>
          </div>
        </div>
      </div>
      <FooterImage />
    </>
  );
};

export default SignIn;
