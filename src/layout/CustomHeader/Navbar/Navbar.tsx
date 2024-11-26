import React from "react";
import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styles from "../CustomHeader.module.scss";
import { HeaderPropsType } from "../../../types/types";
import { LanguageDropdown } from "../LanguageDropdown/LanguageDropdown";

import { Login } from "./Login/Login";

export const Navbar: React.FC<HeaderPropsType> = ({
  handleLanguageClick,
  languageItems,
  language,
  changeLanguage,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.navbar}>
      <Link to="/main">
        <Button
          type="link"
          className={styles.backToMainBtn}
          icon={<HomeOutlined />}
        >
          {t("main")}
        </Button>
      </Link>
      <div className={styles.settings}>
        <div className={styles.verticalLine}></div>
        <p>{t("language")}</p>
        <LanguageDropdown
          handleLanguageClick={handleLanguageClick}
          languageItems={languageItems}
          language={language}
          changeLanguage={changeLanguage}
        />
        <div className={styles.verticalLine}></div>
      </div>
      <Login />
    </div>
  );
};
