import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useTranslation } from "react-i18next";

import { UserData } from "../../../../../types/types";
import { useUserContext } from "../../../../../context/UserContext";
import { SubTitle } from "../../../../../components/SubTitle/SubTitle";
import { Hexagon } from "../../../../../components/Hexagon/Hexagon";

import styles from "./Physique.module.scss";

export const Physique: React.FC = () => {
  const auth = getAuth();
  const { t } = useTranslation();
  const { updateUserData } = useUserContext();
  const [userData, setUserData] = useState<UserData | null>(null);

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
    <div className={styles.physique}>
      <SubTitle children={t("physique")} />
      <div className={styles.wrapper}>
        <Hexagon
          text={`${userData.height} ${t("cm")}`}
          className={styles.hexagon}
        />
        <Hexagon
          text={`${userData.weight} ${t("kg")}`}
          className={styles.hexagon}
        />
      </div>
    </div>
  );
};
