import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  SettingOutlined,
  CloseOutlined,
  RedoOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Button, Upload, Image } from "antd";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useTranslation } from "react-i18next";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";
import { Loader } from "components/Loader/Loader";
import { useAuth } from "context/AuthContext";

import styles from "./ProfileAvatar.module.scss";

export const ProfileAvatar: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [avatarURL, setAvatarURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const storage = getStorage();

  useEffect(() => {
    const fetchAvatar = async () => {
      setLoading(true);
      try {
        const avatarRef = ref(storage, `avatar/${user!.uid}`);
        const url = await getDownloadURL(avatarRef);
        setAvatarURL(url);
      } catch (error) {
        setAvatarURL(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAvatar();
  }, [user, storage]);

  const handleDeleteAvatar = async () => {
    if (user) {
      const avatarRef = ref(storage, `avatar/${user.uid}`);
      try {
        await deleteObject(avatarRef);
        setAvatarURL(null);
        ClosableMessage({ type: "success", content: t("profilePhotoDeleted") });
      } catch (error) {
        ClosableMessage({ type: "error", content: t("deleteFailed") });
      }
    }
  };

  const handleUploadAvatar = async (file: Blob | ArrayBuffer) => {
    if (user) {
      const avatarRef = ref(storage, `avatar/${user.uid}`);
      try {
        await uploadBytes(avatarRef, file);
        setAvatarURL(await getDownloadURL(avatarRef));
        ClosableMessage({ type: "success", content: t("profilePhotoUpdated") });
      } catch (error) {
        ClosableMessage({ type: "error", content: t("uploadFailed") });
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
            accept="image/*"
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.avatar}>
          {avatarURL ? (
            <Image
              src={avatarURL}
              alt="Avatar"
              className={styles.avatarSize}
              preview={{
                mask: (
                  <div className={styles.mask}>
                    <EyeOutlined />
                    <span>{t("show")} </span>
                  </div>
                ),
              }}
            />
          ) : (
            <Avatar className={styles.avatarSize} icon={<UserOutlined />} />
          )}
          <Dropdown menu={{ items }} arrow>
            <Button icon={<SettingOutlined />} className={styles.settingIcon} />
          </Dropdown>
        </div>
      )}
    </>
  );
});
