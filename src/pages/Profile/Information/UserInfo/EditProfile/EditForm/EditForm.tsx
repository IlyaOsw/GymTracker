import { Form } from "antd";
import React, { useState, useEffect } from "react";
import countries from "react-select-country-list";
import { useTranslation } from "react-i18next";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import { SyncOutlined } from "@ant-design/icons";
import { useAuth } from "context/AuthContext";
import { CustomButton } from "components/CustomButton/CustomButton";
import { CustomInput } from "components/CustomInput/CustomInput";
import { Calendar } from "components/Calendar/Calendar";
import { EditFormPropsType } from "types/edit-form";
import { CountrySelect } from "components/CountrySelect/CountrySelect";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";
import { SportSelect } from "components/SportSelect/SportSelect";
import { calculateAge } from "utils/calculateAge";
import { useUserContext } from "context/UserContext";
import { disabledDate } from "utils/disabledDate";

import styles from "../EditProfile.module.scss";

const countryOptions = countries().getData();

export const EditForm: React.FC<EditFormPropsType> = React.memo(
  ({ onClose, setIsModalOpen }) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { updateUserData } = useUserContext();
    const { user } = useAuth();
    const [filteredCountries, setFilteredCountries] = useState(countryOptions);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [status, setStatus] = useState("");
    const [country, setCountry] = useState<string | undefined>(undefined);
    const [city, setCity] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
    const [sport, setSport] = useState("");

    useEffect(() => {
      const fetchUserData = async () => {
        if (user) {
          const userDoc = await getDoc(doc(getFirestore(), "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setStatus(userData.status);
            setCountry(userData.location.country);
            setCity(userData.location.city);
            setDateOfBirth(userData.dateOfBirth.toDate());
            setSport(userData.sport);
            form.setFieldsValue({
              firstName: userData.firstName,
              lastName: userData.lastName,
              status: userData.status,
              height: userData.height,
              weight: userData.weight,
              country: userData.location.country,
              city: userData.location.city,
              dateOfBirth: userData.dateOfBirth.toDate(),
              sport: userData.sport,
            });
          }
        }
      };

      fetchUserData();
    }, [user, form]);

    const handleUpdateInformation = async () => {
      if (user && dateOfBirth) {
        try {
          const age = calculateAge(dateOfBirth);
          await setDoc(
            doc(getFirestore(), "users", user.uid),
            {
              firstName,
              lastName,
              status,
              location: {
                country,
                city,
              },
              dateOfBirth: dateOfBirth,
              age,
              sport,
            },
            { merge: true }
          );

          updateUserData({
            firstName,
            lastName,
            status,
            location: {
              country,
              city,
            },
            dateOfBirth,
            age,
            sport,
          });

          setIsModalOpen(false);
          onClose();
          ClosableMessage({
            type: "success",
            content: t("profileInformationUpdated"),
          });
        } catch (error) {
          ClosableMessage({
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
    const handleStatusChange = (value: string) => setStatus(value);
    const handleCountryChange = (value: string | undefined) =>
      setCountry(value);
    const handleCityChange = (value: string) => setCity(value);
    const handleDateOfBirthChange = (date: Date | null) => setDateOfBirth(date);
    const handleSportChange = (value: string) => setSport(value);

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
          <SportSelect value={sport} onChange={handleSportChange} />
          <CustomInput
            name="status"
            text={t("status")}
            placeholder={t("enterStatus")}
            isRequired={false}
            value={status}
            onChange={handleStatusChange}
          />
          <CountrySelect
            country={country}
            handleCountryChange={handleCountryChange}
            filterOptions={filterOptions}
            filteredCountries={filteredCountries}
            isRequired={false}
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
            label={
              <span className={styles.inputLabel}>{t("dateOfBirth")}</span>
            }
          >
            <Calendar
              value={dateOfBirth || null}
              onChange={handleDateOfBirthChange}
              disabledDate={disabledDate}
            />
          </Form.Item>
          <CustomButton
            onClick={handleUpdateInformation}
            icon={<SyncOutlined />}
          >
            {t("update")}
          </CustomButton>
        </div>
      </Form>
    );
  }
);
