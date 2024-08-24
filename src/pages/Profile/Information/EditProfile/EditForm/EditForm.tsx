import { Form, message } from "antd";
import React, { useState, useEffect } from "react";
import countries from "react-select-country-list";
import { useTranslation } from "react-i18next";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { SyncOutlined } from "@ant-design/icons";

import { CustomButton } from "../../../../../components/CustomButton/CustomButton";
import { CustomInput } from "../../../../../components/CustomInput/CustomInput";
import { Calendar } from "../../../../../components/Calendar/Calendar";
import styles from "../EditProfile.module.scss";
import { EditFormPropsType } from "../../../../../types/types";
import { useUserContext } from "../../../../../context/UserContext";
import { CountrySelect } from "../../../../../components/CountrySelect/CountrySelect";
import { calculateAge } from "../../../../../utils/calculateAge";

const countryOptions = countries().getData();

export const EditForm: React.FC<EditFormPropsType> = ({
  onClose,
  setIsModalOpen,
}) => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const { updateUserData } = useUserContext();
  const [filteredCountries, setFilteredCountries] = useState(countryOptions);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [city, setCity] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(getFirestore(), "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setCountry(userData.location.country);
          setCity(userData.location.city);
          setDateOfBirth(userData.dateOfBirth.toDate());

          form.setFieldsValue({
            firstName: userData.firstName,
            lastName: userData.lastName,
            country: userData.location.country,
            city: userData.location.city,
            dateOfBirth: userData.dateOfBirth.toDate(),
          });
        }
      }
    };
    fetchUserData();
  }, [form]);

  const handleUpdateInformation = async () => {
    const user = getAuth().currentUser;
    if (user && dateOfBirth) {
      try {
        const age = calculateAge(dateOfBirth);
        await setDoc(
          doc(getFirestore(), "users", user.uid),
          {
            firstName,
            lastName,
            location: {
              country,
              city,
            },
            dateOfBirth: dateOfBirth.toISOString().split("T")[0],
            age,
          },
          { merge: true }
        );
        await updateUserData({
          firstName,
          lastName,
          location: {
            country,
            city,
          },
          dateOfBirth,
          age,
        });
        setIsModalOpen(false);
        onClose();
        messageApi.open({
          type: "success",
          content: t("profileInformationUpdated"),
        });
      } catch (error) {
        messageApi.open({
          type: "error",
          content: t("profileInformationUpdateFailed"),
        });
      }
    }
  };

  const filterOptions = (input: string) => {
    const filtered = countryOptions.filter((country) =>
      country.label.toLowerCase().startsWith(input.toLowerCase())
    );
    setFilteredCountries(filtered.length > 0 ? filtered : countryOptions);
  };

  const handleFirstNameChange = (value: string) => setFirstName(value);

  const handleLastNameChange = (value: string) => setLastName(value);

  const handleCountryChange = (value: string | undefined) => setCountry(value);

  const handleCityChange = (value: string) => setCity(value);

  const handleDateOfBirthChange = (date: Date | null) => setDateOfBirth(date);

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ remember: true }}
      name="editProfileForm"
    >
      {contextHolder}
      <div className={styles.modal}>
        <CustomInput
          name="firstName"
          text={t("firstName")}
          placeholder={t("enterFirstName")}
          isRequired={false}
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <CustomInput
          name="lastName"
          text={t("lastName")}
          placeholder={t("enterLastName")}
          isRequired={false}
          value={lastName}
          onChange={handleLastNameChange}
        />
        <CountrySelect
          country={country}
          handleCountryChange={handleCountryChange}
          filterOptions={filterOptions}
          filteredCountries={filteredCountries}
        />
        <CustomInput
          name="city"
          text={t("city")}
          placeholder={t("enterCity")}
          isRequired={false}
          value={city}
          onChange={handleCityChange}
        />
        <Form.Item
          name="dateOfBirth"
          rules={[{ required: false }]}
          label={<span className={styles.inputLabel}>{t("dateOfBirth")}</span>}
        >
          <Calendar
            value={dateOfBirth || null}
            onChange={handleDateOfBirthChange}
          />
        </Form.Item>
        <CustomButton onClick={handleUpdateInformation} icon={<SyncOutlined />}>
          {t("update")}
        </CustomButton>
      </div>
    </Form>
  );
};
