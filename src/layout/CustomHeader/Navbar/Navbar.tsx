import React from "react";
import { Dropdown, MenuProps, Space } from "antd";
import { Button } from "antd";
import { DownOutlined, LoginOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";

import styles from "../CustomHeader.module.scss";
import { HeaderPropsType } from "../../../types/types";
import { CustomButton } from "../../../components/Button/CustomButton";

export const Navbar: React.FC<HeaderPropsType> = ({
  handleThemeClick,
  themeItems,
  theme,
  handleLanguageClick,
  languageItems,
  language,
  changeLanguage,
}) => {
  const { t } = useTranslation();

  const themeMenuItems: MenuProps["items"] = themeItems?.map((item) => ({
    key: item.key,
    label: (
      <div>
        <span className={styles.themeIcon}>{item.icon}</span>
        <span className={styles.dropdownItem}>{item.label}</span>
      </div>
    ),
  }));

  const languageMenuItems: MenuProps["items"] = languageItems?.map((item) => ({
    key: item.key,
    label: <span className={styles.dropdownItem}>{item.label}</span>,
    onClick: () => changeLanguage(item.label),
  }));

  return (
    <div className={styles.navbar}>
      <Link to={"/main"}>
        <Button type="link" className={styles.backToMainBtn}>
          {t("main")}
        </Button>
      </Link>
      <div className={styles.settings}>
        <div className={styles.verticalLine}></div>
        <p className={styles.settingTitle}>{t("theme")}</p>
        <Dropdown menu={{ items: themeMenuItems }}>
          <Space>
            <Button type="link" className={styles.settingsBtn} size="large">
              <span className={styles.dropdownItem}>{theme}</span>
              <DownOutlined />
            </Button>
          </Space>
        </Dropdown>
        <div className={styles.verticalLine}></div>
        <p className={styles.settingTitle}>{t("language")}</p>
        <Dropdown menu={{ items: languageMenuItems }}>
          <Space>
            <Button type="link" className={styles.settingsBtn} size="large">
              <span className={styles.dropdownItem}>{language}</span>
              <DownOutlined />
            </Button>
          </Space>
        </Dropdown>
        <div className={styles.verticalLine}></div>
      </div>
      <div className={styles.login}>
        <Link to={"/signin"}>
          <Button type="link" className={styles.signIn}>
            {t("signIn")}
          </Button>
        </Link>
        <Link to={"/signup"}>
          <CustomButton className={styles.btn} icon={<LoginOutlined />}>
            {t("signUp")}
          </CustomButton>
        </Link>
      </div>
    </div>
  );
};
