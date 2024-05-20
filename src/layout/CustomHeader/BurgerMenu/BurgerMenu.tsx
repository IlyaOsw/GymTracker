import { DownOutlined } from "@ant-design/icons";
import { Drawer, Menu, Button, Dropdown, GetProp, MenuProps } from "antd";
import React, { useEffect } from "react";
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { HeaderPropsType } from "../../../types/types";
import styles from "../CustomHeader.module.scss";
import { useAuth } from "../../../context/AuthContext";

type MenuItem = GetProp<MenuProps, "items">[number];
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
  const { isAuthenticated, logout } = useAuth();
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

  const handleLogout = () => {
    logout();
    onClose();
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

  const items: MenuItem[] = [
    {
      key: "1",
      label: (
        <Link
          to={"/main"}
          onClick={handleSignInClick}
          className={styles.menuButton}
        >
          {t("main")}
        </Link>
      ),
    },
    {
      key: "2",
      label: <Divider />,
    },
    {
      key: "3",
      label: isAuthenticated ? (
        <Link to="/" onClick={handleLogout} className={styles.menuButton}>
          {t("signOut")}
        </Link>
      ) : (
        <Link
          to={"/signin"}
          onClick={handleSignInClick}
          className={styles.menuButton}
        >
          {t("signIn")}
        </Link>
      ),
    },
    {
      key: "4",
      label: isAuthenticated ? null : (
        <Link
          to={"/signup"}
          onClick={handleSignUpClick}
          className={styles.menuButton}
        >
          {t("signUp")}
        </Link>
      ),
    },
    {
      key: "5",
      label: <Divider />,
    },
    {
      key: "6",
      label: (
        <>
          <span className={styles.burgerSettings}>{t("theme")}</span>
          <Dropdown
            overlay={
              <Menu onClick={handleThemeClick}>
                {themeItems?.map((item) => (
                  <Menu.Item key={item.key}>
                    <span className={styles.themeIcon}>{item.icon}</span>
                    <span>{item.label}</span>
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <Button type="text" className={styles.settingsButton}>
              {theme}
              <DownOutlined />
            </Button>
          </Dropdown>
        </>
      ),
    },
    {
      key: "7",
      label: (
        <>
          <span className={styles.burgerSettings}>{t("language")}</span>
          <Dropdown
            overlay={
              <Menu
                onClick={handleLanguageClick}
                className={styles.settingsBtn}
              >
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
            <Button type="text" className={styles.settingsButton}>
              {language}
              <DownOutlined />
            </Button>
          </Dropdown>
        </>
      ),
    },
  ];

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
      <Menu mode="vertical" className={styles.burgerColor} items={items} />
    </Drawer>
  );
};
