import React from "react";
import { useTranslation } from "react-i18next";
import { HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

import styles from "../About.module.scss";

export const Contacts: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.contacts}>
      <span className={styles.contactsTitle}>{t("contacts")}</span>
      <span className={styles.contactsItem}>
        <MailOutlined /> gymtracker@gmail.com
      </span>
      <span className={styles.contactsItem}>
        <PhoneOutlined /> +372 5349 4177
      </span>
      <span className={styles.contactsItem}>
        <HomeOutlined /> {t("locatedIn")}
      </span>
    </div>
  );
};
