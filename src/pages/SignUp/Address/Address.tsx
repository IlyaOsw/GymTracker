import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import countries from "react-select-country-list";

import { CustomInput } from "../../../components/CustomInput/CustomInput";
import styles from "../SignUp.module.scss";
import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { AddressType } from "../../../types/address";
import { CountrySelect } from "../../../components/CountrySelect/CountrySelect";

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

  const handleCountryChange = (value: string) => onCountryChange(value);
  const handleCityChange = (value: string) => onCityChange(value);

  return (
    <div>
      <SubTitle>{t("address")}</SubTitle>
      <div className={styles.addressOptions}>
        <CountrySelect
          handleCountryChange={handleCountryChange}
          filterOptions={filterOptions}
          filteredCountries={filteredCountries}
          isRequired={true}
        />
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
