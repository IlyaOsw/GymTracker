import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar, Upload } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { CustomInput } from "../../../components/CustomInput/CustomInput";
import { ConfirmPasswordInput } from "../../../components/PasswordInput/ConfirmPasswordInput";

import styles from "../SignUp.module.scss";
import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { RegistrationType } from "../../../types/types";

export const Registration: React.FC<RegistrationType> = ({
  onEmailChange,
  onPasswordChange,
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
          <Avatar size={250} icon={<UserOutlined />} />
        )}
        <Upload {...props} showUploadList={false}>
          <CustomButton icon={<UploadOutlined />} className={styles.upload}>
            {t("uploadProfilePhoto")}
          </CustomButton>
        </Upload>
      </div>
      <div>
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
