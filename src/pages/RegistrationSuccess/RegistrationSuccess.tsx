import React from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRightOutlined } from "@ant-design/icons";
import { CustomButton } from "components/CustomButton/CustomButton";
import { CustomFooter } from "layout/CustomFooter/CustomFooter";
import { PageWrapper } from "components/PageWrapper/PageWrapper";
import { useAuth } from "context/AuthContext";

import styles from "./RegistrationSuccess.module.scss";

const RegistrationSuccess: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <>
      <PageWrapper>
        <div className={styles.result}>
          <Result
            status="success"
            title={
              <div className={styles.title}>{t("registrationSuccess")}</div>
            }
            subTitle={
              <div className={styles.subTitle}>{t("thankForRegistration")}</div>
            }
          />
          <Link to={`/profile/${user!.uid}`}>
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
