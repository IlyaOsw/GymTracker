import React, { useEffect } from "react";
import { Select, ConfigProvider, Form } from "antd";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import { FieldType, ICountrySelectProps } from "../../types/types";
import { animation, useAnimatedInView } from "../../hooks/useAnimatedInView ";

import styles from "./CountrySelect.module.scss";

const { Option } = Select;

export const CountrySelect: React.FC<ICountrySelectProps> = ({
  country,
  handleCountryChange,
  filterOptions,
  filteredCountries,
  isRequired,
}) => {
  const { ref, controls } = useAnimatedInView();
  const { t } = useTranslation();

  return (
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
            },
          },
        }}
      >
        <Form.Item<FieldType>
          name="country"
          label={<span className={styles.inputLabel}>{t("country")}</span>}
          rules={[{ required: isRequired }]}
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
        </Form.Item>
      </ConfigProvider>
    </motion.div>
  );
};
