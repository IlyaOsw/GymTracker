import React, { useEffect } from "react";
import { Checkbox, Form } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FooterImage } from "../../components/FooterImage/FooterImage";
import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";

import styles from "./SignIn.module.scss";

const SignIn: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <PageWrapper>
        <DescriptionTitle text={t("signIn")} textAlign="center" />
        <Form
          form={form}
          name="signUpForm"
          initialValues={{ remember: true }}
          layout="vertical"
          className={styles.form}
        >
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
        </Form>
      </PageWrapper>

      <FooterImage />
    </>
  );
};

export default SignIn;
