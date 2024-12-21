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
import { getAuth } from "firebase/auth";

import { ClosableMessage } from "../../../../components/ClosableMessage/ClosableMessage";
import { Loader } from "../../../../components/Loader/Loader";

import styles from "./ProfileAvatar.module.scss";

export const ProfileAvatar: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [avatarURL, setAvatarURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const avatarSize = windowWidth <= 768 ? 150 : 250;
  const storage = getStorage();
  const user = getAuth().currentUser;

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
      setLoading(true);
      const avatarRef = ref(storage, `avatar/${user.uid}`);
      getDownloadURL(avatarRef)
        .then((url) => {
          setAvatarURL(url);
        })
        .catch(() => {
          setAvatarURL(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setAvatarURL(null);
      setLoading(false);
    }
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
              style={{
                width: avatarSize,
                height: avatarSize,
                borderRadius: "50%",
              }}
              preview={{
                mask: (
                  <div className={styles.mask}>
                    <EyeOutlined />
                    <span>{t("showAvatar")} </span>
                  </div>
                ),
              }}
            />
          ) : (
            <Avatar size={avatarSize} icon={<UserOutlined />} />
          )}
          <Dropdown menu={{ items }} arrow>
            <Button icon={<SettingOutlined />} className={styles.settingIcon} />
          </Dropdown>
        </div>
      )}
    </>
  );
});
