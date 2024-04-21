import React from "react";

import { HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

import styles from "../About.module.scss";

export const Contacts: React.FC = () => {
  return (
    <div className={styles.contacts}>
      <span className={styles.contactsTitle}>Contacts</span>
      <span className={styles.contactsItem}>
        <MailOutlined /> gymtracker@gmail.com
      </span>
      <span className={styles.contactsItem}>
        <PhoneOutlined /> +372 5349 4177
      </span>
      <span className={styles.contactsItem}>
        <HomeOutlined /> Located in Estonia
      </span>
    </div>
  );
};
