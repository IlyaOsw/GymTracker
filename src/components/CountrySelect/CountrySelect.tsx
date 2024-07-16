import React from "react";
import { Select, ConfigProvider, Form } from "antd";
import { useTranslation } from "react-i18next";

import { CountrySelectProps } from "../../types/types";

import styles from "./CountrySelect.module.scss";

const { Option } = Select;

export const CountrySelect: React.FC<CountrySelectProps> = ({
  country,
  handleCountryChange,
  filterOptions,
  filteredCountries,
}) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      name="country"
      label={<span className={styles.inputLabel}>{t("country")}</span>}
      rules={[{ required: false }]}
    >
      <ConfigProvider
        theme={{
          components: {
            Select: {
              colorTextPlaceholder: "#818181",
              colorText: "#ffffff",
              optionSelectedBg: "#404040",
              optionActiveBg: "#404040",
            },
          },
        }}
      >
        <Select
          placeholder={t("enterCountry")}
          className={styles.selectField}
          value={country}
          onChange={handleCountryChange}
          variant="borderless"
          dropdownStyle={{ backgroundColor: "#282828" }}
          showSearch
          allowClear
          filterOption={false}
          onSearch={filterOptions}
        >
          {filteredCountries.map(
            (country: { value: string; label: string }) => (
              <Option key={country.value} value={country.label}>
                {country.label}
              </Option>
            )
          )}
        </Select>
      </ConfigProvider>
    </Form.Item>
  );
};
