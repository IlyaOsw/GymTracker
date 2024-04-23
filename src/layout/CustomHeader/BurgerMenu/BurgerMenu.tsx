import { DownOutlined } from "@ant-design/icons";
import { Drawer, Menu, Button, Dropdown, Space, MenuProps } from "antd";
import React from "react";
import { Divider } from "antd";

import { useTranslation } from "react-i18next";

import { Link, useNavigate } from "react-router-dom";

import { HeaderPropsType } from "../../../types/types";

import styles from "../CustomHeader.module.scss";

export const BurgerMenu: React.FC<HeaderPropsType> = ({
  open,
  setOpen,
  theme,
  handleThemeClick,
  themeItems,
  language,
  handleLanguageClick,
  languageItems,
  changeLanguage,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onClose = () => {
    if (setOpen) {
      setOpen(false);
    }
  };

  const handleSignInClick = () => {
    onClose();
    navigate("/signin");
  };

  const handleSignUpClick = () => {
    onClose();
    navigate("/signup");
  };

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
    <Drawer
      title={t("menu")}
      placement="right"
      closable={true}
      onClose={onClose}
      open={open}
      width={300}
      className={styles.burgerColor}
    >
      <Menu mode="vertical" className={styles.burgerColor}>
        <Menu.Item key="1" className={styles.burgerItem}>
          <Link
            to={"/main"}
            onClick={handleSignInClick}
            className={styles.menuButton}
          >
            {t("main")}
          </Link>
        </Menu.Item>
        <Divider />
        <Menu.Item key="2" className={styles.burgerItem}>
          <Link
            to={"/signin"}
            onClick={handleSignInClick}
            className={styles.menuButton}
          >
            {t("signIn")}
          </Link>
        </Menu.Item>
        <Menu.Item key="3" className={styles.burgerItem}>
          <Link
            to={"/signup"}
            onClick={handleSignUpClick}
            className={styles.menuButton}
          >
            {t("signUp")}
          </Link>
        </Menu.Item>
        <Divider />
        <Menu.Item key="4" className={styles.burgerItem}>
          <span className={styles.burgerSettings}>{t("theme")}</span>
          <Dropdown menu={{ items: themeMenuItems }}>
            <Space>
              <Button type="text" className={styles.settingsButton}>
                {theme}
                <DownOutlined />
              </Button>
            </Space>
          </Dropdown>
        </Menu.Item>
        <Menu.Item key="5" className={styles.burgerItem}>
          <span className={styles.burgerSettings}>{t("language")}</span>
          <Dropdown menu={{ items: languageMenuItems }}>
            <Space>
              <Button type="text" className={styles.settingsButton}>
                {language}
                <DownOutlined />
              </Button>
            </Space>
          </Dropdown>
        </Menu.Item>
        <Divider />
      </Menu>
    </Drawer>
  );
};
