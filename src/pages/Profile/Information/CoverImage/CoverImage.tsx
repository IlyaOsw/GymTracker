import { CameraOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useTranslation } from "react-i18next";

import { auth, storage } from "../../../..";
import { SettingButton } from "../../../../components/SettingButton/SettingButton";
import { ClosableMessage } from "../../../../components/ClosableMessage/ClosableMessage";

import styles from "./CoverImage.module.scss";

export const CoverImage: React.FC = () => {
  const { t } = useTranslation();
  const [coverURL, setCoverURL] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const coverRef = ref(storage, `cover/${user.uid}`);
      getDownloadURL(coverRef)
        .then((url) => {
          setCoverURL(url);
        })
        .catch((error) => {
          setCoverURL("");
        });
    }
  }, []);

  const handleUploadCoverImage = async (file: File) => {
    const user = auth.currentUser;
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

  return (
    <div className={styles.paper}>
      {coverURL ? (
        <img src={coverURL} alt="CoverImg" />
      ) : (
        <div className={styles.paperPlaceholder} />
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
    </div>
  );
};
