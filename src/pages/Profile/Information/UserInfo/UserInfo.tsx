import {
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import { UserData } from "../../../../types/types";
import { useUserContext } from "../../../../context/UserContext";

import styles from "./UserInfo.module.scss";

export const UserInfo: React.FC = () => {
  const { t } = useTranslation();
  const { updateUserData } = useUserContext();
  const [userData, setUserData] = useState<UserData | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchData = async (user: User | null) => {
      if (user) {
        const data = await fetchUserData(user.uid);
        setUserData(data);
      } else {
        setUserData(null);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, fetchData);
    fetchData(auth.currentUser);

    return () => unsubscribe();
  }, [updateUserData]);

  const fetchUserData = async (userId: string): Promise<UserData | null> => {
    try {
      const userDoc = doc(getFirestore(), "users", userId);
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
            <EnvironmentOutlined className={styles.icon} />
            {userData.location.country}, {userData.location.city}
          </li>
          <li>
            <CalendarOutlined className={styles.icon} />
            {t("age")}: {userData.age}
          </li>
        </ul>
      </div>
    </div>
  );
};
