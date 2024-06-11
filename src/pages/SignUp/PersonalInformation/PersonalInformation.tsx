import React from "react";
import { Form, ConfigProvider, Select } from "antd";
import { useTranslation } from "react-i18next";

import { CustomInput } from "../../../components/CustomInput/CustomInput";
import styles from "../SignUp.module.scss";
import { Calendar } from "../../../components/Calendar/Calendar";
import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { PersonalInformationType } from "../../../types/types";

const { Option } = Select;

export const PersonalInformation: React.FC<PersonalInformationType> = ({
  onFirstNameChange,
  onLastNameChange,
  onGenderChange,
  onDateOfBithChange,
}) => {
  const { t } = useTranslation();

  const handleFirstNameChange = (value: string) => onFirstNameChange(value);

  const handleLastNameChange = (value: string) => onLastNameChange(value);

  const handleGenderChange = (value: string) => onGenderChange(value);
  const handleDateOfBirthChange = (value: Date) => {
    const dateString = value.toISOString().split("T")[0];
    onDateOfBithChange(dateString);
  };

  return (
    <div className={styles.personalInfo}>
      <SubTitle>{t("personalInfo")}</SubTitle>
      <div className={styles.personalInfoOptions}>
        <div>
          <CustomInput
            name={t("firstName")}
            text={t("firstName")}
            placeholder={t("enterFirstName")}
            onChange={handleFirstNameChange}
          />
          <CustomInput
            name={t("lastName")}
            text={t("lastName")}
            placeholder={t("enterLastName")}
            isRequired={false}
            onChange={handleLastNameChange}
          />
        </div>
        <div>
          <Form.Item
            name="gender"
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
                    optionActiveBg: "#0097b2",
                  },
                },
              }}
            >
              <Select
                placeholder={t("chooseGender")}
                onChange={handleGenderChange}
                className={styles.selectField}
                variant="borderless"
                dropdownStyle={{
                  backgroundColor: "#282828",
                }}
              >
                <Option value="male">{t("male")}</Option>
                <Option value="female">{t("female")}</Option>
              </Select>
            </ConfigProvider>
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            rules={[{ required: true }]}
            label={
              <span className={styles.inputLabel}>{t("dateOfBirth")}</span>
            }
          >
            <Calendar onChange={handleDateOfBirthChange} />
          </Form.Item>
        </div>
      </div>
    </div>
  );
};
