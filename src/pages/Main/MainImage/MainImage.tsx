import { RightCircleOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { CustomButton } from "../../../components/Button/CustomButton";

import styles from "./MainImage.module.scss";

export const MainImage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <img
        className={styles.mainImage}
        src={process.env.PUBLIC_URL + "/assets/Images/MainImage.jpg"}
        alt="Logo"
      />
      <div className={styles.title}>
        {t("title1")} <br /> {t("title2")}
      </div>
      <div className={styles.buttons}>
        <Link to={"/signup"}>
          <CustomButton
            icon={<RightCircleOutlined />}
            className={styles.joinBtn}
          >
            {t("joinToday")}
          </CustomButton>
        </Link>
        <img
          className={styles.downloadImage}
          src={process.env.PUBLIC_URL + "/assets/Images/DownloadOnApp.png"}
          alt="Download"
        />
      </div>
    </div>
  );
};
