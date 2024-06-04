import { CameraOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import React from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useTranslation } from "react-i18next";
import { doc, updateDoc } from "firebase/firestore";

import { auth, db, storage } from "../../../..";
import { CoverImagePropsType } from "../../../../types/types";

import styles from "./CoverImage.module.scss";

export const CoverImage: React.FC<CoverImagePropsType> = ({
  coverURL,
  setCoverURL,
}) => {
  const { t } = useTranslation();
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
