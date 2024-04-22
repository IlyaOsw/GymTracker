import React from "react";
import { Dropdown, Space } from "antd";
import { Button, Menu } from "antd";
import { DownOutlined, LoginOutlined } from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";

import styles from "../CustomHeader.module.scss";
import { HeaderPropsType } from "../../../types/types";

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
        <Dropdown
          overlay={
            <Menu onClick={handleThemeClick}>
              {themeItems &&
                themeItems.map((item) => (
                  <Menu.Item key={item.key}>
                    <span className={styles.themeIcon}>{item.icon}</span>
                    <span className={styles.dropdownItem}>{item.label}</span>
                  </Menu.Item>
                ))}
            </Menu>
          }
        >
          <Space>
            <Button type="link" className={styles.settingsBtn} size="large">
              <span className={styles.dropdownItem}>{theme}</span>
              <DownOutlined />
            </Button>
          </Space>
        </Dropdown>
        <div className={styles.verticalLine}></div>
        <p className={styles.settingTitle}>{t("language")}</p>
        <Dropdown
          overlay={
            <Menu onClick={handleLanguageClick}>
              {languageItems &&
                languageItems.map((item) => (
                  <Menu.Item
                    key={item.key}
                    onClick={() => changeLanguage(item.label)}
                  >
                    <span className={styles.dropdownItem}>{item.label}</span>
                  </Menu.Item>
                ))}
            </Menu>
          }
        >
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
          <Button
            type="primary"
            shape="round"
            className={styles.btn}
            size="large"
            icon={<LoginOutlined />}
          >
            {t("signUp")}
          </Button>
        </Link>
      </div>
    </div>
  );
};
