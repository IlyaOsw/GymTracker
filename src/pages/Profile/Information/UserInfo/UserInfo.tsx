import {
  MessageOutlined,
  CheckOutlined,
  PlusCircleOutlined,
  SafetyCertificateOutlined,
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
        console.log("User data:", docSnap.data());
        return docSnap.data() as UserData;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
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
        console.log("No user is signed in.");
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.personalInformation}>
      <div>
        {userData.firstName} {userData.lastName}
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
