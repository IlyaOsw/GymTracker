import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../../..";
import { UserProvider } from "../../../context/UserContext";

import styles from "./Information.module.scss";
import { FavoriteExercises } from "./FavoriteExercises/FavoriteExercises";
import { UserInfo } from "./UserInfo/UserInfo";
import { ProfileAvatar } from "./ProfileAvatar/ProfileAvatar";
import { CoverImage } from "./CoverImage/CoverImage";
import { EditProfile } from "./EditProfile/EditProfile";

export const Information: React.FC = () => {
  const { t } = useTranslation();
  const [avatarURL, setAvatarURL] = useState<string | null>(null);
  const [coverURL, setCoverURL] = useState<string | null>(null);
  const [edit, setEdit] = useState<boolean>(false);

  const handleEditProfile = () => setEdit(true);

  const handleModalClose = () => setEdit(false);

  useEffect(() => {
    const loadUserPhotos = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data?.avatarURL) {
            setAvatarURL(data.avatarURL);
          }
          if (data?.coverURL) {
            setCoverURL(data.coverURL);
          }
        }
      }
    };

    loadUserPhotos();
  }, []);

  return (
    <UserProvider>
      <div className={styles.mainContainer}>
        <CoverImage coverURL={coverURL} setCoverURL={setCoverURL} />
        <ProfileAvatar avatarURL={avatarURL} setAvatarURL={setAvatarURL} />
      </div>
      <div className={styles.infoContainer}>
        <UserInfo />
        <FavoriteExercises />
        <Button
          icon={<EditOutlined />}
          onClick={handleEditProfile}
          className={styles.editBtn}
        >
          <span className={styles.buttonText}>{t("editProfile")}</span>
        </Button>
      </div>
      {edit && <EditProfile onClose={handleModalClose} />}
    </UserProvider>
  );
};
