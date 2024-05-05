import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Form, Button } from "antd";

import { FooterImage } from "../../components/FooterImage/FooterImage";
import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";

import { Registration } from "./Registration/Registration";
import { PersonalInformation } from "./PersonalInformation/PersonalInformation";
import { Address } from "./Address/Address";
import styles from "./SignUp.module.scss";

const SignUp: React.FC = () => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const onReset = () => form.resetFields();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Form
      form={form}
      name="signUpForm"
      initialValues={{ remember: true }}
      layout="vertical"
    >
      <PageWrapper>
        <DescriptionTitle text={t("signUp")} textAlign="center" />
        <Registration />
        <PersonalInformation />
        <Address />
        <Button
          htmlType="button"
          type="link"
          className={styles.reset}
          onClick={onReset}
        >
          {t("resetForm")}
        </Button>
      </PageWrapper>
      <Link to="/profile">
        <CustomButton className={styles.signUpBtn}>{t("signUp")}</CustomButton>
      </Link>
      <FooterImage />
    </Form>
  );
};

export default SignUp;
