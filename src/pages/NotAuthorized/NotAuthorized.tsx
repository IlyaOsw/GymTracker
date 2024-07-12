import React from "react";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { CustomButton } from "../../components/CustomButton/CustomButton";

import styles from "./NotAuthorized.module.scss";

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <Result
      status="404"
      title={<span className={styles.title}>403 {t("403error")}</span>}
      subTitle={<span className={styles.subTitle}>{t("notAuthorized")}</span>}
      extra={
        <CustomButton className={styles.backHome} onClick={handleBackHome}>
          {t("backHome")}
        </CustomButton>
      }
      className={styles.result}
    />
  );
};

export default NotFound;
