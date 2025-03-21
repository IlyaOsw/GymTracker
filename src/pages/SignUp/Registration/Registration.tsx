import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar, Upload } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomButton } from "components/CustomButton/CustomButton";
import { CustomInput } from "components/CustomInput/CustomInput";
import { ConfirmPasswordInput } from "components/PasswordInput/ConfirmPasswordInput";
import { RegistrationType } from "types/registration";
import { SubTitle } from "components/SubTitle/SubTitle";

import styles from "../SignUp.module.scss";

export const Registration: React.FC<RegistrationType> = ({
  onEmailChange,
  onPasswordChange,
  onImageChange,
}) => {
  const { t } = useTranslation();
  const [image, setImage] = useState<string | null>(null);

  const props = {
    beforeUpload(file: any) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        setImage(result);
        onImageChange(file);
      };
      return false;
    },
  };

  return (
    <div className={styles.registrationFlex}>
      <div className={styles.avatar}>
        {image ? (
          <img src={image} alt="Profile" className={styles.profileImage} />
        ) : (
          <Avatar
            size={250}
            icon={<UserOutlined />}
            style={{ background: "rgb(103, 103, 103)" }}
          />
        )}
        <Upload {...props} showUploadList={false} accept="image/*">
          <CustomButton icon={<UploadOutlined />} className={styles.upload}>
            {t("uploadProfilePhoto")}
          </CustomButton>
        </Upload>
        <span className={styles.avatarFormat}>{t("avatarFormat")}</span>
      </div>
      <div className={styles.info}>
        <SubTitle>{t("registration")}</SubTitle>
        <CustomInput
          name="email"
          text={t("email")}
          placeholder={t("enterMail")}
          onChange={onEmailChange}
        />
        <ConfirmPasswordInput onChange={onPasswordChange} />
      </div>
    </div>
  );
};
