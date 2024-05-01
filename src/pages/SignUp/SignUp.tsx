import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Upload, Avatar } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";

import { FooterImage } from "../../components/FooterImage/FooterImage";
import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput";

import { ConfrimPasswordInput } from "../../components/PasswordInput/ConfrimPasswordInput";

import styles from "./SignUp.module.scss";

const container: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const SignUp: React.FC = () => {
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

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <div style={container}>
        <DescriptionTitle text={t("signUp")} textAlign="center" />
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
            <p className={styles.subTitle}>{t("registration")}</p>
            <CustomInput
              name={t("email")}
              text={t("email")}
              placeholder={t("enterMail")}
            />

            <ConfrimPasswordInput />
          </div>
        </div>
        <div className={styles.personalInfo}>
          <p className={styles.subTitle}>{t("personalInfo")}</p>
          <div className={styles.personalInfoOptions}>
            <div>
              <CustomInput
                name={t("firstName")}
                text={t("firstName")}
                placeholder={t("enterFirstName")}
              />
              <CustomInput
                name={t("lastName")}
                text={t("lastName")}
                placeholder={t("enterLastName")}
                isRequired={false}
              />
            </div>
            <div>
              <CustomInput
                name={t("gender")}
                text={t("gender")}
                placeholder={t("chooseGender")}
              />
              <CustomInput
                name={t("dateOfBirth")}
                text={t("dateOfBirth")}
                placeholder={t("enterDateOfBirth")}
                isRequired={false}
              />
            </div>
          </div>
        </div>
        <div className={styles.address}>
          <p className={styles.subTitle}>{t("address")}</p>
          <div className={styles.addressOptions}>
            <CustomInput
              name={t("country")}
              text={t("country")}
              placeholder={t("enterCountry")}
            />
            <CustomInput
              name={t("city")}
              text={t("city")}
              placeholder={t("enterCity")}
              isRequired={false}
            />
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
