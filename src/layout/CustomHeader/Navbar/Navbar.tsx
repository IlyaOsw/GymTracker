import React from "react";
import { Dropdown, Menu, Space, Button } from "antd";
import {
  DownOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import styles from "../CustomHeader.module.scss";
import { HeaderPropsType } from "../../../types/types";
import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { useAuth } from "../../../context/AuthContext";

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
  const { isAuthenticated, logout } = useAuth();

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
        <p className={styles.settingTitle}>{t("theme")}</p>
        <Dropdown
          overlay={
            <Menu onClick={handleThemeClick}>
              {themeItems?.map((item) => (
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
              {languageItems?.map((item) => (
                <Menu.Item
                  key={item.key}
                  onClick={() => changeLanguage(item.label)}
                >
                  <div className={styles.lngIcons}>
                    <span>{item.icon}</span>
                    <span className={styles.dropdownItem}>{item.label}</span>
                  </div>
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
        {isAuthenticated ? (
          <Link to="/">
            <CustomButton icon={<LogoutOutlined />} onClick={logout}>
              {t("signOut")}
            </CustomButton>
          </Link>
        ) : (
          <>
            <Link to="/signup">
              <Button type="link" className={styles.signIn}>
                {t("signUp")}
              </Button>
            </Link>
            <Link to="/signin">
              <CustomButton icon={<LoginOutlined />}>
                {t("signIn")}
              </CustomButton>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
