import React, { useEffect, useState } from "react";
import { Button, Divider } from "antd";
import { EditOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";

import { auth, db } from "../../..";
import { UserProvider } from "../../../context/UserContext";

import styles from "./Information.module.scss";
import { FavoriteExercises } from "./FavoriteExercises/FavoriteExercises";
import { UserInfo } from "./UserInfo/UserInfo";
import { ProfileAvatar } from "./ProfileAvatar/ProfileAvatar";
import { CoverImage } from "./CoverImage/CoverImage";
import { EditProfile } from "./EditProfile/EditProfile";
import { ConfirmDeleteAccount } from "./ConfirmDeleteAccount/ConfirmDeleteAccount";

export const Information: React.FC = () => {
  const { t } = useTranslation();

  const [edit, setEdit] = useState<boolean>(false);
  const [, setUserData] = useState<any>(null);
  const [confirm, setConfirm] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadUserPhotos(user);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEditProfile = () => setEdit(true);

  const handleModalClose = () => setEdit(false);

  const handleConfirmDelete = () => setConfirm(true);

  const loadUserPhotos = async (user: User) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      setUserData(userData);
    }
  };

  return (
    <UserProvider>
      <div className={styles.mainContainer}>
        <CoverImage />
        <ProfileAvatar />
      </div>
      <div className={styles.infoContainer}>
        <UserInfo />
        <FavoriteExercises />
      </div>
      <div className={styles.buttons}>
        <Button
          icon={<EditOutlined />}
          onClick={handleEditProfile}
          className={styles.btn}
        >
          <span>{t("editProfile")}</span>
        </Button>
        <Button
          icon={<UserDeleteOutlined />}
          className={styles.btn}
          onClick={handleConfirmDelete}
        >
          <span>{t("deleteAccount")}</span>
        </Button>
      </div>
      <Divider style={{ backgroundColor: "gray" }} />
      {edit && <EditProfile onClose={handleModalClose} />}
      {confirm && (
        <ConfirmDeleteAccount confirm={confirm} setConfirm={setConfirm} />
      )}
    </UserProvider>
  );
};
