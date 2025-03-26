import React from "react";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { CustomButton } from "components/CustomButton/CustomButton";
import { FooterImage } from "layout/CustomFooter/FooterImage/FooterImage";

import styles from "./NotFound.module.scss";

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Result
        status="404"
        title={<span className={styles.title}>404 {t("404error")} </span>}
        subTitle={<span className={styles.subTitle}>{t("notFound")}</span>}
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
