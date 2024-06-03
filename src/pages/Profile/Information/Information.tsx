import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, MenuProps, message, Upload } from "antd";
import {
  CameraOutlined,
  EditOutlined,
  RedoOutlined,
  SettingOutlined,
  UserOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { auth, db, storage } from "../../..";

import styles from "./Information.module.scss";
import { FavoriteExercises } from "./FavoriteExercises/FavoriteExercises";
import { UserInfo } from "./UserInfo/UserInfo";

export const Information: React.FC = () => {
  const { t } = useTranslation();
  const [avatarURL, setAvatarURL] = useState<string | null>(null);
  const [coverURL, setCoverURL] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleDeleteAvatar = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { avatarURL: "" });
      setAvatarURL(null);
      message.success(t("profilePhotoDeleted"));
    } else {
      message.error(t("deleteFailed"));
    }
  };

  const handleUploadAvatar = async (file: File) => {
    const user = auth.currentUser;
    if (user) {
      const avatarRef = ref(storage, `avatar/${user.uid}.jpg`);
      await uploadBytes(avatarRef, file);
      const newAvatarURL = await getDownloadURL(avatarRef);
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { avatarURL: newAvatarURL });
      setAvatarURL(newAvatarURL);
      message.success(t("profilePhotoUpdated"));
    } else {
      message.error(t("uploadFailed"));
    }
  };

  const handleUploadCoverImage = async (file: File) => {
    const user = auth.currentUser;
    if (user) {
      const coverImageRef = ref(storage, `cover/${user.uid}.jpg`);
      await uploadBytes(coverImageRef, file);
      const newCoverURL = await getDownloadURL(coverImageRef);
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { coverURL: newCoverURL });
      setCoverURL(newCoverURL);
      message.success(t("coverImageUploaded"));
    } else {
      message.error(t("uploadFailed"));
    }
  };

  const avatarSize = windowWidth <= 768 ? 150 : 250;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <RedoOutlined className={styles.avatarIcons} />
          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              handleUploadAvatar(file);
              return false;
            }}
          >
            <span>{t("uploadNewProfilePhoto")}</span>
          </Upload>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          <CloseOutlined className={styles.avatarIcons} />
          <span onClick={handleDeleteAvatar}>{t("deleteProfilePhoto")}</span>
        </div>
      ),
    },
  ];

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

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.paper}>
          {coverURL ? (
            <img src={coverURL} alt="Paper" />
          ) : (
            <div className={styles.paperPlaceholder}></div>
          )}
          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              handleUploadCoverImage(file);
              return false;
            }}
            className={styles.uploadCoverImage}
          >
            <Button icon={<CameraOutlined />} className={styles.editBtn}>
              <span className={styles.buttonText}>{t("uploadCoverImage")}</span>
            </Button>
          </Upload>
        </div>
        <div className={styles.avatar}>
          {avatarURL ? (
            <img src={avatarURL} alt="Profile" />
          ) : (
            <Avatar size={avatarSize} icon={<UserOutlined />} />
          )}
          <Dropdown menu={{ items }} arrow>
            <Button
              icon={<SettingOutlined />}
              className={styles.settingIcon}
              size="middle"
            />
          </Dropdown>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <UserInfo />
        <FavoriteExercises />
        <Button icon={<EditOutlined />} className={styles.editBtn}>
          <span className={styles.buttonText}>{t("editProfile")}</span>
        </Button>
      </div>
    </>
  );
};
