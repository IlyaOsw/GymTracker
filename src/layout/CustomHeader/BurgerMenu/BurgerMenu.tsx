import { DownOutlined } from "@ant-design/icons";
import { Drawer, Menu, Button, Dropdown, Space } from "antd";
import React, { useEffect } from "react";
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

  useEffect(() => {
    const handleScroll = (event: TouchEvent | WheelEvent) => {
      if (open) {
        event.preventDefault();
      }
    };

    document.addEventListener("touchmove", handleScroll, { passive: false });
    document.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      document.removeEventListener("touchmove", handleScroll);
      document.removeEventListener("wheel", handleScroll);
    };
  }, [open]);

  return (
    <Drawer
      title={t("menu")}
      placement="right"
      closable={true}
      onClose={onClose}
      open={open}
      width={300}
      className={styles.burgerColor}
      destroyOnClose={true}
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
        <Menu.Item key="2">
          <Divider />
        </Menu.Item>
        <Menu.Item key="3" className={styles.burgerItem}>
          <Link
            to={"/signin"}
            onClick={handleSignInClick}
            className={styles.menuButton}
          >
            {t("signIn")}
          </Link>
        </Menu.Item>
        <Menu.Item key="4" className={styles.burgerItem}>
          <Link
            to={"/signup"}
            onClick={handleSignUpClick}
            className={styles.menuButton}
          >
            {t("signUp")}
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Divider />
        </Menu.Item>
        <Menu.Item key="6" className={styles.burgerItem}>
          <span className={styles.burgerSettings}>{t("theme")}</span>
          <Dropdown
            overlay={
              <Menu onClick={handleThemeClick}>
                {themeItems &&
                  themeItems.map((item) => (
                    <Menu.Item key={item.key}>
                      <span className={styles.themeIcon}>{item.icon}</span>
                      <span>{item.label}</span>
                    </Menu.Item>
                  ))}
              </Menu>
            }
          >
            <Space>
              <Button type="text" className={styles.settingsButton}>
                {theme}
                <DownOutlined />
              </Button>
            </Space>
          </Dropdown>
        </Menu.Item>
        <Menu.Item key="7" className={styles.burgerItem}>
          <span className={styles.burgerSettings}>{t("language")}</span>
          <Dropdown
            overlay={
              <Menu
                onClick={handleLanguageClick}
                className={styles.settingsBtn}
              >
                {languageItems &&
                  languageItems.map((item) => (
                    <Menu.Item
                      key={item.key}
                      onClick={() => changeLanguage(item.label)}
                    >
                      {item.label}
                    </Menu.Item>
                  ))}
              </Menu>
            }
          >
            <Space>
              <Button type="text" className={styles.settingsButton}>
                {language}
                <DownOutlined />
              </Button>
            </Space>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </Drawer>
  );
};
