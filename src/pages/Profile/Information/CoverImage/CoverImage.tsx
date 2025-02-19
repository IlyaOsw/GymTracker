import { CameraOutlined, CloseOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import React, { useEffect, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useTranslation } from "react-i18next";
import { SettingButton } from "components/SettingButton/SettingButton";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";
import { Loader } from "components/Loader/Loader";

import { auth, storage } from "../../../..";

import styles from "./CoverImage.module.scss";

export const CoverImage: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const user = auth.currentUser;
  const [coverURL, setCoverURL] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const coverRef = ref(storage, `cover/${user.uid}`);
      getDownloadURL(coverRef)
        .then((url) => {
          setCoverURL(url);
          setLoading(false);
        })
        .catch(() => {
          setCoverURL("");
          setLoading(false);
        });
    } else {
      setCoverURL("");
      setLoading(false);
    }
  }, [user]);

  const handleUploadCoverImage = async (file: File) => {
    if (user) {
      const coverImageRef = ref(storage, `cover/${user.uid}`);
      try {
        await uploadBytes(coverImageRef, file);
        const newCoverURL = await getDownloadURL(coverImageRef);
        setCoverURL(newCoverURL);
        ClosableMessage({ type: "success", content: t("coverImageUploaded") });
      } catch (error) {
        ClosableMessage({ type: "error", content: t("uploadFailed") });
      }
    }
  };

  const deleteCoverImage = async () => {
    setCoverURL("");
    if (user) {
      try {
        await deleteObject(ref(storage, `cover/${user.uid}`));
        ClosableMessage({ type: "success", content: t("coverImageDeleted") });
      } catch (error) {
        ClosableMessage({ type: "error", content: t("deleteFailed") });
      }
    }
  };

  return (
    <div className={styles.paper}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {coverURL ? (
            <>
              <img src={coverURL} alt="CoverImg" />
              <SettingButton
                icon={<CloseOutlined />}
                className={styles.deleteBtn}
                onClick={deleteCoverImage}
              >
                <span className={styles.buttonText}>{t("deleteImage")}</span>
              </SettingButton>
            </>
          ) : (
            <img
              src={
                process.env.PUBLIC_URL +
                "/assets/Images/CoverPhoto/wallpaper.jpg"
              }
              alt="CoverImg"
            />
          )}
          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              handleUploadCoverImage(file);
              return false;
            }}
            accept="image/*"
            className={styles.uploadCoverImage}
          >
            <SettingButton icon={<CameraOutlined />} className={styles.editBtn}>
              <span className={styles.buttonText}>{t("uploadCoverImage")}</span>
            </SettingButton>
          </Upload>
        </>
      )}
    </div>
  );
});
