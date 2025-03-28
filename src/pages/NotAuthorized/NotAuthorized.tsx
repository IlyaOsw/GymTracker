import React from "react";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { CustomButton } from "components/CustomButton/CustomButton";
import { FooterImage } from "layout/CustomFooter/FooterImage/FooterImage";

import styles from "./NotAuthorized.module.scss";

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Result
        status="403"
        title={<span className={styles.title}>403 {t("403error")}</span>}
        subTitle={<span className={styles.subTitle}>{t("notAuthorized")}</span>}
        extra={
          <CustomButton
            className={styles.backHome}
            onClick={() => navigate("/")}
            icon={<ArrowLeftOutlined />}
          >
            {t("backHome")}
          </CustomButton>
        }
        className={styles.result}
      />
      <FooterImage />
    </>
  );
};

export default NotFound;
