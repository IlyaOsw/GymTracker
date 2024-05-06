import { Form, ConfigProvider, Select } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import countries from "react-select-country-list";

import { CustomInput } from "../../../components/CustomInput/CustomInput";
import styles from "../SignUp.module.scss";
import { SubTitle } from "../../../components/SubTitle/SubTitle";

const { Option } = Select;

const countryOptions = countries().getData();

export const Address: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.address}>
      <SubTitle>{t("address")}</SubTitle>
      <div className={styles.addressOptions}>
        <Form.Item
          name={t("country")}
          label={<span className={styles.inputLabel}>{t("country")}</span>}
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
              placeholder={t("enterCountry")}
              className={styles.selectField}
              variant="borderless"
              dropdownStyle={{
                backgroundColor: "#141414",
                border: "1px solid #0097b2",
              }}
            >
              {countryOptions.map(
                (country: { value: string; label: string }) => (
                  <Option key={country.value} value={country.value}>
                    {country.label}
                  </Option>
                )
              )}
            </Select>
          </ConfigProvider>
        </Form.Item>
        <CustomInput
          name={t("city")}
          text={t("city")}
          placeholder={t("enterCity")}
          isRequired={false}
        />
      </div>
    </div>
  );
};
