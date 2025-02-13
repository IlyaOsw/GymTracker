import React, { useEffect } from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRightOutlined } from "@ant-design/icons";
import { CustomButton } from "components/CustomButton/CustomButton";
import { CustomFooter } from "layout/CustomFooter/CustomFooter";
import { PageWrapper } from "components/PageWrapper/PageWrapper";

import styles from "./RegistrationSuccess.module.scss";

const Title: React.FC = () => {
  const { t } = useTranslation();
  return <div className={styles.title}>{t("registrationSuccess")}</div>;
};

const SubTitle: React.FC = () => {
  const { t } = useTranslation();
  return <div className={styles.subTitle}>{t("thankForRegistration")}</div>;
};

const RegistrationSuccess: React.FC = () => {
  const { t } = useTranslation();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <PageWrapper>
        <div className={styles.result}>
          <Result status="success" title={<Title />} subTitle={<SubTitle />} />
          <Link to="/profile">
            <CustomButton
              children={t("toProfile")}
              icon={<ArrowRightOutlined />}
            />
          </Link>
        </div>
      </PageWrapper>
      <CustomFooter />
    </>
  );
};

export default RegistrationSuccess;
