import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Upload, Avatar } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";

import { FooterImage } from "../../components/FooterImage/FooterImage";
import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput";

import styles from "./SignUp.module.scss";

const container: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const SignUp: React.FC = () => {
  const { t } = useTranslation();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const props = {
    name: "file",
    action: "https://www.example.com/upload",
    headers: {
      authorization: "authorization-token",
    },
    beforeUpload(file: any) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        setImageUrl(result);
      };
      return false;
    },
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <div style={container}>
        <DescriptionTitle text={t("signUp")} textAlign="center" />
        <div className={styles.registrationFlex}>
          <div className={styles.avatar}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Profile"
                className={styles.profileImage}
              />
            ) : (
              <div className={styles.profilePlaceholder}>
                <Avatar size={300} icon={<UserOutlined />} />
              </div>
            )}
            <div className={styles.uploadContainer}>
              <Upload {...props} showUploadList={false}>
                <CustomButton
                  icon={<UploadOutlined />}
                  className={styles.upload}
                >
                  {t("uploadProfilePhoto")}
                </CustomButton>
              </Upload>
            </div>
          </div>
          <div>
            <p className={styles.subTitle}>{t("registration")} </p>
            <CustomInput text={t("email")}></CustomInput>
            <CustomInput text={t("password")} type="password"></CustomInput>
            <CustomInput
              text={t("confrimPassword")}
              type="password"
            ></CustomInput>
          </div>
        </div>
        <div className={styles.personalInfo}>
          <p className={styles.subTitle}>{t("personalInfo")}</p>
          <div className={styles.personalInfoOptions}>
            <div>
              <CustomInput text={t("firstName")}></CustomInput>
              <CustomInput text={t("phone")}></CustomInput>
            </div>
            <div>
              <CustomInput text={t("lastName")}></CustomInput>
              <CustomInput text={t("age")}></CustomInput>
            </div>
          </div>
        </div>
        <div className={styles.address}>
          <p className={styles.subTitle}>{t("address")} </p>
          <div className={styles.addressOptions}>
            <CustomInput text={t("country")}></CustomInput>
            <CustomInput text={t("city")}></CustomInput>
          </div>
        </div>
      </div>
      <Link to="/profile">
        <CustomButton className={styles.signUpBtn}>{t("signUp")}</CustomButton>
      </Link>
      <FooterImage />
    </>
  );
};

export default SignUp;
