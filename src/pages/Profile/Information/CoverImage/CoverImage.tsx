import { CameraOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useTranslation } from "react-i18next";

import { auth, storage } from "../../../..";

import styles from "./CoverImage.module.scss";

export const CoverImage: React.FC = () => {
  const { t } = useTranslation();
  const [coverURL, setCoverURL] = useState("");

  const handleUploadCoverImage = async (file: File) => {
    const user = auth.currentUser;
    if (user) {
      const coverImageRef = ref(storage, `cover/${user.uid}.jpg`);
      try {
        await uploadBytes(coverImageRef, file);
        const newCoverURL = await getDownloadURL(coverImageRef);

        setCoverURL(newCoverURL);
        message.success(t("coverImageUploaded"));
      } catch (error) {
        console.error("Error uploading cover image:", error);
        message.error(t("uploadFailed"));
      }
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const coverRef = ref(storage, `cover/${user.uid}.jpg`);
      getDownloadURL(coverRef)
        .then((url) => {
          setCoverURL(url);
        })
        .catch((error) => {
          console.error("Error fetching avatar URL:", error);
          setCoverURL("");
        });
    }
  }, [auth.currentUser]);

  return (
    <div className={styles.paper}>
      {coverURL ? (
        <img src={coverURL} alt="Paper" />
      ) : (
        <div className={styles.paperPlaceholder} />
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
  );
};
