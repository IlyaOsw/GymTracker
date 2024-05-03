import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Upload, Avatar, Form, Select, Button, ConfigProvider } from "antd";
import {
  CaretDownOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { FooterImage } from "../../components/FooterImage/FooterImage";
import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { CustomInput } from "../../components/CustomInput/CustomInput";

import { ConfirmPasswordInput } from "../../components/PasswordInput/ConfirmPasswordInput";

import { Calendar } from "../../components/Calendar/Calendar";

import styles from "./SignUp.module.scss";

const { Option } = Select;

const container: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const SignUp: React.FC = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState<string | null>(null);
  const [form] = Form.useForm();

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

  const onReset = () => form.resetFields();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Form
      form={form}
      name="signUpForm"
      initialValues={{ remember: true }}
      layout="vertical"
    >
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
            <ConfirmPasswordInput />
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
              <Form.Item
                name={t("gender")}
                label={<span className={styles.inputLabel}>{t("gender")}</span>}
                rules={[{ required: true }]}
              >
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        colorTextPlaceholder: "#818181",
                        colorText: "#ffffff",
                        optionSelectedBg: "#0097b2",
                      },
                    },
                  }}
                >
                  <Select
                    placeholder={t("chooseGender")}
                    className={styles.selectField}
                    suffixIcon={<CaretDownOutlined />}
                    variant="borderless"
                    dropdownStyle={{
                      backgroundColor: "#141414",
                      border: "1px solid #0097b2",
                    }}
                  >
                    <Option value="male">{t("male")}</Option>
                    <Option value="female">{t("female")}</Option>
                  </Select>
                </ConfigProvider>
              </Form.Item>
              <Form.Item
                name={t("dateOfBirth")}
                label={
                  <span className={styles.inputLabel}>{t("dateOfBirth")}</span>
                }
              >
                <Calendar />
              </Form.Item>
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
        <Button
          htmlType="button"
          type="link"
          className={styles.reset}
          onClick={onReset}
        >
          {t("resetForm")}
        </Button>
      </div>
      <Link to="/profile">
        <CustomButton className={styles.signUpBtn}>{t("signUp")}</CustomButton>
      </Link>
      <FooterImage />
    </Form>
  );
};

export default SignUp;
