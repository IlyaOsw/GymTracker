import React, { useEffect, useState } from "react";
import { Checkbox, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { LoginOutlined } from "@ant-design/icons";
import { DescriptionTitle } from "components/DescriptionTitle/DescriptionTitle";
import { CustomInput } from "components/CustomInput/CustomInput";
import { CustomButton } from "components/CustomButton/CustomButton";
import { PasswordInput } from "components/PasswordInput/PasswordInput";
import { PageWrapper } from "components/PageWrapper/PageWrapper";
import { CustomFooter } from "layout/CustomFooter/CustomFooter";
import { useAuth } from "context/AuthContext";
import { animation, useAnimatedInView } from "hooks/useAnimatedInView ";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";

import styles from "./SignIn.module.scss";

const SignIn: React.FC = () => {
  const { t } = useTranslation();
  const { ref, controls } = useAnimatedInView();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleSignIn = async () => {
    try {
      await form.validateFields();
      await login(email, password);
      navigate(`/profile/${user!.uid}`);
    } catch (error) {
      ClosableMessage({ type: "error", content: t("invalidEmailOrPass") });
    }
  };

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
            onChange={(value: string) => setEmail(value)}
          />
          <PasswordInput
            name="password"
            text={t("password")}
            placeholder={t("enterPassword")}
            onChange={(value: string) => setPassword(value)}
          />
          <motion.div
            className={styles.options}
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={animation}
          >
            <Checkbox className={styles.checkboxRemember}>
              {t("rememberMe")}
            </Checkbox>
            <Link to="/resetpassword" className={styles.importantOption}>
              {t("forgotPassword")}
            </Link>
          </motion.div>
          <CustomButton
            className={styles.signInBtn}
            onClick={handleSignIn}
            icon={<LoginOutlined />}
            htmlType="submit"
          >
            {t("signIn")}
          </CustomButton>
          <motion.div
            className={styles.options}
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={animation}
          >
            <div className={styles.notRegistered}>{t("notRegistered")}</div>
            <Link to="/signup" className={styles.importantOption}>
              {t("createAnAccount")}
            </Link>
          </motion.div>
        </Form>
      </PageWrapper>
      <CustomFooter />
    </>
  );
};

export default SignIn;
