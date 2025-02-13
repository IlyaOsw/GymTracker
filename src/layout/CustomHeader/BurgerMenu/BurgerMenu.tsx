import { Drawer, Menu, message } from "antd";
import React, { useEffect } from "react";
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { BurgerMenuItem } from "types/burger-menu";
import { HeaderPropsType } from "types/header";
import { useAuth } from "context/AuthContext";

import styles from "../CustomHeader.module.scss";

import { LanguageDropdown } from "../LanguageDropdown/LanguageDropdown";

export const BurgerMenu: React.FC<HeaderPropsType> = ({
  open,
  setOpen,
  language,
  handleLanguageClick,
  languageItems,
  changeLanguage,
}) => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
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
    messageApi.open({
      type: "success",
      content: t("logout"),
    });
  };

  const itemsMenu: BurgerMenuItem[] = [
    {
      key: "1",
      label: (
        <Link to={"/main"} onClick={onClose} className={styles.menuButton}>
          {t("main")}
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={"/contact"} onClick={onClose} className={styles.menuButton}>
          {t("contact")}
        </Link>
      ),
    },
    {
      key: "3",
      label: <Divider />,
    },
    {
      key: "4",
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
      key: "5",
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
      key: "6",
      label: <Divider />,
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
    <>
      {contextHolder}
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
    </>
  );
};
