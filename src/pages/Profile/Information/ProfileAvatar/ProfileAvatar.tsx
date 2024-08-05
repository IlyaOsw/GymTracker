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
  const [messageApi, contextHolder] = message.useMessage();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [avatarURL, setAvatarURL] = useState<string | null>(null);
  const avatarSize = windowWidth <= 768 ? 150 : 250;
  const auth = getAuth();
  const storage = getStorage();
  const user = auth.currentUser;

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
    if (user) {
      const avatarRef = ref(storage, `avatar/${user.uid}`);
      getDownloadURL(avatarRef)
        .then((url) => {
          setAvatarURL(url);
        })
        .catch((error) => {
          setAvatarURL(null);
        });
    }
  }, [auth.currentUser]);

  const handleDeleteAvatar = async () => {
    if (user) {
      const avatarRef = ref(storage, `avatar/${user.uid}`);
      try {
        await deleteObject(avatarRef);

        setAvatarURL(null);
        messageApi.open({
          type: "success",
          content: t("profilePhotoDeleted"),
        });
      } catch (error) {
        messageApi.open({
          type: "error",
          content: t("deleteFailed"),
        });
      }
    }
  };

  const handleUploadAvatar = async (file: Blob | ArrayBuffer) => {
    if (user) {
      const avatarRef = ref(storage, `avatar/${user.uid}`);
      try {
        await uploadBytes(avatarRef, file);
        const newAvatarURL = await getDownloadURL(avatarRef);

        setAvatarURL(newAvatarURL);
        messageApi.open({
          type: "success",
          content: t("profilePhotoUpdated"),
        });
      } catch (error) {
        messageApi.open({
          type: "error",
          content: t("uploadFailed"),
        });
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
      {contextHolder}
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
