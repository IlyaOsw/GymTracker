import { DownOutlined } from "@ant-design/icons";
import { Drawer, Menu, Button, Dropdown, Space } from "antd";
import React from "react";

import { useTranslation } from "react-i18next";

import { HeaderPropsType } from "../../../types/types";

import styles from "../CustomHeader.module.scss";
import i18n from "../../../i18n";

export const BurgerMenu: React.FC<HeaderPropsType> = ({
  setVisible,
  visible,
  theme,
  handleThemeClick,
  themeItems,
  language,
  handleLanguageClick,
  languageItems,
}) => {
  const { t } = useTranslation();

  const changeLanguage = (language: string): void => {
    i18n.changeLanguage(language);
  };

  const onClose = () => {
    if (setVisible) {
      setVisible(false);
    }
  };

  return (
    <Drawer
      title={t("menu")}
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
      width={300}
      className={styles.burgerColor}
    >
      <Menu mode="vertical" className={styles.burgerColor}>
        <Menu.Item key="1" className={styles.burgerItem}>
          <Button type="text" className={styles.menuButton}>
            {t("signIn")}
          </Button>
        </Menu.Item>
        <Menu.Item key="2" className={styles.burgerItem}>
          <Button type="text" className={styles.menuButton}>
            {t("signUp")}
          </Button>
        </Menu.Item>
        <Menu.Item key="3" className={styles.burgerItem}>
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
        <Menu.Item key="4" className={styles.burgerItem}>
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
