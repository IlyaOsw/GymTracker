import React from "react";
import { useTranslation } from "react-i18next";
import { HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

import { SubTitle } from "../../../../components/SubTitle/SubTitle";

import styles from "./Contacts.module.scss";

export const Contacts: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.contacts}>
      <SubTitle children={t("contacts")} />
      <span className={styles.contactsItem}>
        <a href="mailto:infogymtracker@gmail.com">
          <MailOutlined /> gymtracker@gmail.com
        </a>
      </span>
      <span className={styles.contactsItem}>
        <a href="tel:+37253494177">
          <PhoneOutlined /> +372 5349 4177
        </a>
      </span>
      <span className={styles.contactsItem}>
        <a
          href="https://www.google.com/maps/place/%D0%A2%D0%B0%D1%80%D1%82%D1%83/@58.3752523,26.6503333,12z/data=!4m6!3m5!1s0x46eb36d8d55d3df7:0x400b36d18fc6d10!8m2!3d58.377983!4d26.7290383!16zL20vMDdzYjE?entry=ttu"
          target="_blank"
          rel="noreferrer"
        >
          <HomeOutlined /> {t("locatedIn")}
        </a>
      </span>
    </div>
  );
};
