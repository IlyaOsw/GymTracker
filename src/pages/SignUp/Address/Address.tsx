import { Form, ConfigProvider, Select } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import countries from "react-select-country-list";

import { CustomInput } from "../../../components/CustomInput/CustomInput";
import styles from "../SignUp.module.scss";
import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { AddressType } from "../../../types/types";

const { Option } = Select;

const countryOptions = countries().getData();

export const Address: React.FC<AddressType> = ({
  onCountryChange,
  onCityChange,
}) => {
  const { t } = useTranslation();
  const [filteredCountries, setFilteredCountries] = useState(countryOptions);

  const filterOptions = (input: string) => {
    const filtered = countryOptions.filter((country) =>
      country.label.toLowerCase().startsWith(input.toLowerCase())
    );
    setFilteredCountries(filtered.length > 0 ? filtered : countryOptions);
  };

  const handleCountryChange = (value: string) => {
    onCountryChange(value);
  };

  const handleCityChange = (value: string) => {
    onCityChange(value);
  };
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
                  optionActiveBg: "#0097b2",
                },
              },
            }}
          >
            <Select
              placeholder={t("enterCountry")}
              className={styles.selectField}
              onChange={handleCountryChange}
              variant="borderless"
              dropdownStyle={{
                backgroundColor: "#282828",
              }}
              showSearch
              allowClear
              filterOption={false}
              onSearch={(value) => filterOptions(value)}
            >
              {filteredCountries.map(
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
          onChange={handleCityChange}
        />
      </div>
    </div>
  );
};
