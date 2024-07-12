import { Form, ConfigProvider, Select, message } from "antd";
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

const { Option } = Select;
const countryOptions = countries().getData();

export const EditForm: React.FC<EditFormPropsType> = ({
  onClose,
  setIsModalOpen,
}) => {
  const { t } = useTranslation();
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
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", user.uid));
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

  const calculateAge = (dateOfBirth: Date) => {
    const currentDate = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleUpdateInformation = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user && dateOfBirth) {
      try {
        const db = getFirestore();
        const age = calculateAge(dateOfBirth);
        await setDoc(
          doc(db, "users", user.uid),
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
        message.success(t("profileInformationUpdated"));
      } catch (error) {
        message.error(t("profileInformationUpdateFailed"));
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
                  optionSelectedBg: "#0097b2",
                  optionActiveBg: "#0097b2",
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
              onSearch={(value) => filterOptions(value)}
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
