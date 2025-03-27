import React from "react";
import { Form, ConfigProvider, Select } from "antd";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { CustomInput } from "components/CustomInput/CustomInput";
import { Calendar } from "components/Calendar/Calendar";
import { SubTitle } from "components/SubTitle/SubTitle";
import { FieldType } from "types/field";
import { animation, useAnimatedInView } from "hooks/useAnimatedInView ";
import { disabledDate } from "utils/disabledDate";
import { PersonalInformationType } from "types/personal-information";

import styles from "../SignUp.module.scss";

const { Option } = Select;

export const PersonalInformation: React.FC<PersonalInformationType> = ({
  onFirstNameChange,
  onLastNameChange,
  onGenderChange,
  onDateOfBirthChange,
}) => {
  const { ref, controls } = useAnimatedInView();
  const { t } = useTranslation();

  const handleFirstNameChange = (value: string) => onFirstNameChange(value);
  const handleLastNameChange = (value: string) => onLastNameChange(value);
  const handleGenderChange = (value: string) => onGenderChange(value);
  const handleDateOfBirthChange = (date: Date | null) =>
    onDateOfBirthChange(date);

  return (
    <div className={styles.personalInfo}>
      <SubTitle>{t("personalInfo")}</SubTitle>
      <div className={styles.personalInfoOptions}>
        <div>
          <CustomInput
            name="firstName"
            text={t("firstName")}
            placeholder={t("enterFirstName")}
            onChange={handleFirstNameChange}
          />
          <CustomInput
            name="lastName"
            text={t("lastName")}
            placeholder={t("enterLastName")}
            isRequired={false}
            onChange={handleLastNameChange}
          />
        </div>
        <div>
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={animation}
          >
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    colorTextPlaceholder: "#818181",
                    colorText: "#ffffff",
                    optionSelectedBg: "#404040",
                    optionActiveBg: "#404040",
                    colorBgElevated: "#282828",
                  },
                },
              }}
            >
              <Form.Item<FieldType>
                name="gender"
                label={<span className={styles.inputLabel}>{t("gender")}</span>}
                rules={[{ required: true }]}
              >
                <Select
                  placeholder={t("chooseGender")}
                  onChange={handleGenderChange}
                  className={styles.selectField}
                  variant="borderless"
                >
                  <Option value="male">{t("male")}</Option>
                  <Option value="female">{t("female")}</Option>
                </Select>
              </Form.Item>
            </ConfigProvider>
          </motion.div>
          <Form.Item<FieldType>
            name="dateOfBirth"
            rules={[{ required: true }]}
            label={
              <span className={styles.inputLabel}>{t("dateOfBirth")}</span>
            }
          >
            <Calendar
              onChange={handleDateOfBirthChange}
              disabledDate={disabledDate}
            />
          </Form.Item>
        </div>
      </div>
    </div>
  );
};
