import React, { useEffect, useState } from "react";
import { Divider, Skeleton } from "antd";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useUserContext } from "context/UserContext";
import { IUserData } from "types/user-data";

import { db } from "../../..";

import styles from "./Information.module.scss";
import { UserInfo } from "./UserInfo/UserInfo";
import { ProfileAvatar } from "./ProfileAvatar/ProfileAvatar";
import { CoverImage } from "./CoverImage/CoverImage";
import { ProfileAside } from "./ProfileAside/ProfileAside";

export const Information: React.FC = React.memo(() => {
  const auth = getAuth();
  const { updateUserData } = useUserContext();
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) loadUserPhotos(user);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchData = async (user: User | null) => {
      setLoading(true);
      if (user) {
        const data = await fetchUserData(user.uid);
        setUserData(data);
      } else {
        setUserData(null);
      }
      setLoading(false);
    };
    const unsubscribe = onAuthStateChanged(auth, fetchData);
    fetchData(auth.currentUser);
    return () => unsubscribe();
  }, [auth, updateUserData]);

  const fetchUserData = async (userId: string): Promise<IUserData | null> => {
    try {
      const docSnap = await getDoc(doc(getFirestore(), "users", userId));
      if (docSnap.exists()) {
        return docSnap.data() as IUserData;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const loadUserPhotos = async (user: User) => {
    const docSnap = await getDoc(doc(db, "users", user.uid));
    if (docSnap.exists()) {
      const userData = docSnap.data() as IUserData;
      setUserData(userData);
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <CoverImage />
        <ProfileAvatar />
      </div>
      <div className={styles.infoContainer}>
        {loading ? (
          <Skeleton
            active
            className={styles.sceleton}
            paragraph={{ rows: 5, width: ["100%", "80%", "70%", "90%"] }}
          />
        ) : (
          <UserInfo userData={userData} />
        )}
        <ProfileAside userData={userData} />
      </div>
      <Divider style={{ backgroundColor: "gray" }} />
    </>
  );
});
