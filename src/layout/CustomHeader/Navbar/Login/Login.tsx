import {
  UserOutlined,
  LogoutOutlined,
  UserAddOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { CustomButton } from "../../../../components/CustomButton/CustomButton";
import { useAuth } from "../../../../context/AuthContext";

import styles from "./Login.module.scss";

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      {isAuthenticated ? (
        <>
          <Link to="/profile">
            <Button
              type="link"
              icon={<UserOutlined />}
              className={styles.signInAndProfile}
            >
              {t("profile")}
            </Button>
          </Link>
          <Link to="/">
            <CustomButton icon={<LogoutOutlined />} onClick={handleLogout}>
              {t("signOut")}
            </CustomButton>
          </Link>
        </>
      ) : (
        <>
          <Link to="/signup">
            <Button
              type="link"
              icon={<UserAddOutlined />}
              className={styles.signInAndProfile}
            >
              {t("signUp")}
            </Button>
          </Link>
          <Link to="/signin">
            <CustomButton icon={<LoginOutlined />}>{t("signIn")}</CustomButton>
          </Link>
        </>
      )}
    </>
  );
};
