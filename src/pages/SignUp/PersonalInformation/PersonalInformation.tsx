import React from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import { Form, ConfigProvider, Select } from "antd";
import { useTranslation } from "react-i18next";

import { CustomInput } from "../../../components/CustomInput/CustomInput";

import styles from "../SignUp.module.scss";
import { Calendar } from "../../../components/Calendar/Calendar";

const { Option } = Select;

export const PersonalInformation: React.FC = () => {
  const { t } = useTranslation();
  return (
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
  );
};
