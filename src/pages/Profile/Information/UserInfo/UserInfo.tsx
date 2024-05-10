import {
  MessageOutlined,
  CheckOutlined,
  PlusCircleOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { CustomButton } from "../../../../components/CustomButton/CustomButton";

import styles from "./UserInfo.module.scss";

export const UserInfo: React.FC = () => {
  const { t } = useTranslation();
  const [follow, setFollow] = useState(false);

  const handleFollow = () => {
    setFollow((prevFollow) => !prevFollow);
  };

  return (
    <div className={styles.personalInformation}>
      <div>
        Ilja Ossipov
        <SafetyCertificateOutlined className={styles.verificationIcon} />
      </div>
      <div>Sport: Powerlifting</div>
      <div>Estonia, Tartumaa, Tartu</div>
      <div>{t("birthday")} 02.09.1996 (27y.)</div>
      <div className={styles.buttons}>
        <CustomButton className={styles.button} icon={<MessageOutlined />}>
          {t("message")}
        </CustomButton>
        {follow ? (
          <CustomButton
            className={styles.button}
            onClick={handleFollow}
            icon={<CheckOutlined />}
          >
            {t("followed")}
          </CustomButton>
        ) : (
          <CustomButton
            className={styles.button}
            onClick={handleFollow}
            icon={<PlusCircleOutlined />}
          >
            {t("follow")}
          </CustomButton>
        )}
      </div>
    </div>
  );
};
