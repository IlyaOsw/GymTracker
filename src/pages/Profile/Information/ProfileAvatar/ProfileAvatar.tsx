import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  SettingOutlined,
  CloseOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Button, MenuProps, Upload, message } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useTranslation } from "react-i18next";

import { auth, db, storage } from "../../../..";
import { ProfileAvatarPropsType } from "../../../../types/types";

import styles from "./ProfileAvatar.module.scss";

export const ProfileAvatar: React.FC<ProfileAvatarPropsType> = ({
  avatarURL,
  setAvatarURL,
}) => {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const avatarSize = windowWidth <= 768 ? 150 : 250;

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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  return (
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
  );
};
