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
import { CustomButton } from "components/CustomButton/CustomButton";
import { useAuth } from "context/AuthContext";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";

import styles from "../../CustomHeader.module.scss";

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    ClosableMessage({ type: "success", content: t("logout") });
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <Link to={`/profile/${user!.uid}`}>
            <Button type="link" icon={<UserOutlined />} className={styles.link}>
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
              className={styles.link}
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
