import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import { UserData } from "../../../../types/types";
import { useUserContext } from "../../../../context/UserContext";
import { LastWorkout } from "../LastWorkout/LastWorkout";

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
    return <div className={styles.profileContainer} />;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.userInfo}>
          <h2 className={styles.name}>
            {userData.firstName} {userData.lastName}
          </h2>
          <p className={styles.status}>{userData.status}</p>
          <div className={styles.userDetails}>
            <div className={styles.detailItem}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/assets/Icons/AdditionalIcons/location.png"
                }
              />
              {userData.location.country}, {userData.location.city}
            </div>
            <div className={styles.detailItem}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/assets/Icons/AdditionalIcons/age.png"
                }
              />
              {t("age")}: {userData.age}
            </div>
            <div className={styles.detailItem}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/assets/Icons/AdditionalIcons/gender.png"
                }
              />
              {t("gender")}: {t(userData.gender)}
            </div>
            <div className={styles.detailItem}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/assets/Icons/AdditionalIcons/mail.png"
                }
              />
              {userData.email}
            </div>
          </div>
        </div>
        <LastWorkout />
      </div>
    </div>
  );
};
