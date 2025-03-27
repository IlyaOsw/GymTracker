import { Drawer, Menu } from "antd";
import React, { useEffect } from "react";
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { HeaderPropsType } from "types/header";
import { useAuth } from "context/AuthContext";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";

import styles from "../CustomHeader.module.scss";
import { LanguageDropdown } from "../LanguageDropdown/LanguageDropdown";

export const BurgerMenu: React.FC<HeaderPropsType> = ({
  open,
  setOpen,
  language,
  handleLanguageClick,
  languageState,
  changeLanguage,
}) => {
  const { t } = useTranslation();
  const { isAuthenticated, logout, user } = useAuth();

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
    ClosableMessage({ type: "success", content: t("logout") });
  };

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
      <Menu
        className={styles.burgerColor}
        items={[
          {
            key: "1",
            label: (
              <Link
                to={"/main"}
                onClick={onClose}
                className={styles.menuButton}
              >
                {t("main")}
              </Link>
            ),
          },
          {
            key: "2",
            label: (
              <Link
                to={"/contact"}
                onClick={onClose}
                className={styles.menuButton}
              >
                {t("contact")}
              </Link>
            ),
          },
          {
            key: "3",
            label: (
              <Link
                to={"/calculators"}
                onClick={onClose}
                className={styles.menuButton}
              >
                {t("calculators")}
              </Link>
            ),
          },
          {
            key: "4",
            label: <Divider />,
          },
          {
            key: "5",
            label: isAuthenticated ? (
              <Link
                to={`/profile/${user!.uid}`}
                onClick={onClose}
                className={styles.menuButton}
              >
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
            key: "6",
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
            key: "7",
            label: <Divider />,
          },
          {
            key: "8",
            label: (
              <>
                <span className={styles.burgerSettings}>{t("language")}</span>
                <LanguageDropdown
                  handleLanguageClick={handleLanguageClick}
                  languageState={languageState}
                  language={language}
                  changeLanguage={changeLanguage}
                />
              </>
            ),
          },
        ]}
      />
    </Drawer>
  );
};
