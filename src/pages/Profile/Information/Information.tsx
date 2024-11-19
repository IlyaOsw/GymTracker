import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import { EditOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

import { db } from "../../..";
import { useUserContext } from "../../../context/UserContext";
import { SettingButton } from "../../../components/SettingButton/SettingButton";
import { UserData } from "../../../types/types";

import styles from "./Information.module.scss";
import { UserInfo } from "./UserInfo/UserInfo";
import { ProfileAvatar } from "./ProfileAvatar/ProfileAvatar";
import { CoverImage } from "./CoverImage/CoverImage";
import { EditProfile } from "./EditProfile/EditProfile";
import { ConfirmDeleteAccount } from "./ConfirmDeleteAccount/ConfirmDeleteAccount";
import { ProfileAside } from "./ProfileAside/ProfileAside";

export const Information: React.FC = () => {
  const auth = getAuth();
  const { t } = useTranslation();
  const [edit, setEdit] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const { updateUserData } = useUserContext();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadUserPhotos(user);
      }
    });
    return () => unsubscribe();
  }, [auth]);

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
  }, [auth, updateUserData]);

  const fetchUserData = async (userId: string): Promise<UserData | null> => {
    try {
      const docSnap = await getDoc(doc(getFirestore(), "users", userId));
      if (docSnap.exists()) {
        return docSnap.data() as UserData;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const handleEditProfile = () => setEdit(true);
  const handleModalClose = () => setEdit(false);
  const handleConfirmDelete = () => setConfirm(true);

  const loadUserPhotos = async (user: User) => {
    const docSnap = await getDoc(doc(db, "users", user.uid));

    if (docSnap.exists()) {
      const userData = docSnap.data() as UserData;
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
        <UserInfo userData={userData} />
        <ProfileAside />
      </div>
      <div className={styles.buttons}>
        <SettingButton icon={<EditOutlined />} onClick={handleEditProfile}>
          <span>{t("editProfile")}</span>
        </SettingButton>
        <SettingButton
          icon={<UserDeleteOutlined />}
          onClick={handleConfirmDelete}
        >
          <span>{t("deleteAccount")}</span>
        </SettingButton>
      </div>
      <Divider style={{ backgroundColor: "gray" }} />
      {edit && <EditProfile onClose={handleModalClose} userData={userData} />}
      {confirm && (
        <ConfirmDeleteAccount confirm={confirm} setConfirm={setConfirm} />
      )}
    </>
  );
};
