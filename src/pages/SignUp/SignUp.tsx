import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Upload, Avatar } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { animated, useSpring } from "@react-spring/web";

import { FooterImage } from "../../components/FooterImage/FooterImage";
import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { useAnimationObserver } from "../../hooks/useAnimationObserver";

import styles from "./SignUp.module.scss";

const container: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const SignUp: React.FC = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState<string | null>(null);
  const { isVisible, ref } = useAnimationObserver();

  const animationProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0rem)" : "translateY(-10rem)",
    from: { opacity: 0, transform: "translateY(-10rem)" },
    delay: 0,
  });

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
            <CustomInput text={t("email")} />
            <CustomInput text={t("password")} type="password" />
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
              <CustomInput text={t("firstName")} />
              <CustomInput text={t("lastName")} />
            </div>
            <div>
              <CustomInput text={t("phone")} />
              <CustomInput text={t("age")} />
            </div>
          </div>
        </div>
        <div className={styles.address}>
          <p className={styles.subTitle}>{t("address")}</p>
          <div className={styles.addressOptions}>
            <CustomInput text={t("country")} />
            <CustomInput text={t("city")} />
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
