import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  SettingOutlined,
  CloseOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Button, Upload, message } from "antd";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useTranslation } from "react-i18next";
import { getAuth } from "firebase/auth";

import styles from "./ProfileAvatar.module.scss";

export const ProfileAvatar: React.FC = () => {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [avatarURL, setAvatarURL] = useState("");
  const avatarSize = windowWidth <= 768 ? 150 : 250;
  const auth = getAuth();
  const storage = getStorage();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const avatarRef = ref(storage, `avatar/${user.uid}`);
      getDownloadURL(avatarRef)
        .then((url) => {
          setAvatarURL(url);
        })
        .catch((error) => {
          console.error("Error fetching avatar URL:", error);
          setAvatarURL("");
        });
    }
  }, [auth.currentUser]);

  const handleDeleteAvatar = async () => {
    const user = auth.currentUser;
    if (user) {
      const avatarRef = ref(storage, `avatar/${user.uid}`);
      try {
        await deleteObject(avatarRef);

        setAvatarURL("");
        message.success(t("profilePhotoDeleted"));
      } catch (error) {
        message.error(t("deleteFailed"));
      }
    }
  };

  const handleUploadAvatar = async (file: Blob | ArrayBuffer) => {
    const user = auth.currentUser;
    if (user) {
      const avatarRef = ref(storage, `avatar/${user.uid}`);
      try {
        await uploadBytes(avatarRef, file);
        const newAvatarURL = await getDownloadURL(avatarRef);

        setAvatarURL(newAvatarURL);
        message.success(t("profilePhotoUpdated"));
      } catch (error) {
        message.error(t("uploadFailed"));
      }
    }
  };

  const items = [
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
        <div onClick={handleDeleteAvatar}>
          <CloseOutlined className={styles.avatarIcons} />
          <span>{t("deleteProfilePhoto")}</span>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.avatar}>
      {avatarURL ? (
        <img
          src={avatarURL}
          alt="Profile"
          style={{ width: avatarSize, height: avatarSize, borderRadius: "50%" }}
        />
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
