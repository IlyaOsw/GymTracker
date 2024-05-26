import React, { useEffect, useState } from "react";
import { Checkbox, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { CustomFooter } from "../../layout/CustomFooter/CustomFooter";
import { useAuth } from "../../context/AuthContext";

import styles from "./SignIn.module.scss";
import { ErrorModal } from "./ErrorModal/ErrorModal";

const SignIn: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (value: string) => setEmail(value);

  const handlePasswordChange = (value: string) => setPassword(value);

  const handleCloseErrorModal = () => setErrorModalOpen(false);

  const handleSignIn = async () => {
    try {
      await login(email, password);
      navigate("/profile");
    } catch (error) {
      setErrorMessage(t("invalidEmailOrPass"));
      setErrorModalOpen(true);
    }
  };

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
            name="email"
            text={t("email")}
            placeholder={t("enterMail")}
            onChange={handleEmailChange}
          />
          <PasswordInput
            name="password"
            text={t("password")}
            placeholder={t("enterPassword")}
            onChange={handlePasswordChange}
          />
          <div className={styles.options}>
            <Checkbox className={styles.checkboxRemember}>
              {t("rememberMe")}
            </Checkbox>
            <Link to="/resetpassword">
              <div className={styles.importantOption}>
                {t("forgotPassword")}
              </div>
            </Link>
          </div>
          <CustomButton className={styles.signInBtn} onClick={handleSignIn}>
            {t("signIn")}
          </CustomButton>
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
      <CustomFooter />
      <ErrorModal
        open={errorModalOpen}
        onClose={handleCloseErrorModal}
        message={errorMessage}
      />
    </>
  );
};

export default SignIn;
