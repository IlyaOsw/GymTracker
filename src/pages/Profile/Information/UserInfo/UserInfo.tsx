import {
  MessageOutlined,
  CheckOutlined,
  PlusCircleOutlined,
  UserOutlined,
  HomeOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

import { CustomButton } from "../../../../components/CustomButton/CustomButton";
import { UserData } from "../../../../types/types";

import styles from "./UserInfo.module.scss";

export const UserInfo: React.FC = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [follow, setFollow] = useState<boolean>(false);

  const handleFollow = () => {
    setFollow((prevFollow) => !prevFollow);
  };

  const fetchUserData = async (userId: string): Promise<UserData | null> => {
    try {
      const db = getFirestore();
      const userDoc = doc(db, "users", userId);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        return docSnap.data() as UserData;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        const data = await fetchUserData(user.uid);
        setUserData(data);
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!userData) {
    return <div className={styles.personalInformation} />;
  }

  return (
    <div className={styles.personalInformation}>
      <div className={styles.userInfo}>
        <ul>
          <li>
            <UserOutlined className={styles.icon} />
            {userData.firstName} {userData.lastName}
          </li>
          <li>
            <HomeOutlined className={styles.icon} />
            {userData.location.country} {userData.location.city}
          </li>
          <li>
            <CalendarOutlined className={styles.icon} />
            {userData.age} y. o.
          </li>
        </ul>
      </div>
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
