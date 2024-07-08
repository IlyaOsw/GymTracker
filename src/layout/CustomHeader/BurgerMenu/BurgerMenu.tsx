import { Drawer, Menu } from "antd";
import React, { useEffect } from "react";
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { BurgerMenuItem, HeaderPropsType } from "../../../types/types";
import styles from "../CustomHeader.module.scss";
import { useAuth } from "../../../context/AuthContext";
import { ThemeDropdown } from "../ThemeDropdown/ThemeDropdown";
import { LanguageDropdown } from "../LanguageDropdown/LanguageDropdown";

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

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const itemsMenu: BurgerMenuItem[] = [
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
        <Link to="/profile" onClick={onClose} className={styles.menuButton}>
          {t("profile")}
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
      label: isAuthenticated ? (
        <Link to="/" onClick={handleLogout} className={styles.menuButton}>
          {t("signOut")}
        </Link>
      ) : (
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
          <ThemeDropdown
            handleThemeClick={handleThemeClick}
            themeItems={themeItems}
            theme={theme}
          />
        </>
      ),
    },
    {
      key: "7",
      label: (
        <>
          <span className={styles.burgerSettings}>{t("language")}</span>
          <LanguageDropdown
            handleLanguageClick={handleLanguageClick}
            languageItems={languageItems}
            language={language}
            changeLanguage={changeLanguage}
          />
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
      width={270}
      className={styles.burgerColor}
      destroyOnClose={true}
    >
      <Menu className={styles.burgerColor} items={itemsMenu} />
    </Drawer>
  );
};
