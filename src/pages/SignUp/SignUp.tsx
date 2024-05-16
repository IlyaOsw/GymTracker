import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Form } from "antd";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { CustomFooter } from "../../layout/CustomFooter/CustomFooter";
import { ResetButton } from "../../components/ResetButton/ResetButton";

import RegistrationError from "../RegistrationError/RegistrationError";

import { Registration } from "./Registration/Registration";
import { PersonalInformation } from "./PersonalInformation/PersonalInformation";
import { Address } from "./Address/Address";
import styles from "./SignUp.module.scss";

const SignUp: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onReset = () => form.resetFields();

  const handleEmailChange = (email: string) => {
    setEmail(email);
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
  };

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  const handleDateOfBirthChange = (value: string) => {
    setDateOfBirth(value);
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
  };

  const handleCityChange = (value: string) => {
    setCity(value);
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName || "",
        dateOfBirth: dateOfBirth || "",
        gender: gender,
        location: {
          country: country,
          city: city || "",
        },
      };

      const db = getFirestore();
      const docRef = await addDoc(collection(db, "users"), userData);

      setSuccess(true);
    } catch (error) {
      console.error("Error registering user:", error);
      setError(true);
    }
  };

  if (error) {
    navigate("/registrationError");
  }

  if (success) {
    navigate("/registrationSuccess");
  }

  // useEffect(() => {
  //   window.scroll(0, 0);
  // }, []);

  return (
    <Form
      form={form}
      name="signUpForm"
      initialValues={{ remember: true }}
      layout="vertical"
    >
      <PageWrapper>
        <DescriptionTitle text={t("signUp")} textAlign="center" />
        <Registration
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
        />
        <PersonalInformation
          onFirstNameChange={handleFirstNameChange}
          onLastNameChange={handleLastNameChange}
          onGenderChange={handleGenderChange}
          onDateOfBithChange={handleDateOfBirthChange}
        />
        <Address
          onCountryChange={handleCountryChange}
          onCityChange={handleCityChange}
        />
        <ResetButton children={t("resetForm")} onClick={onReset} />
      </PageWrapper>
      <CustomButton className={styles.signUpBtn} onClick={handleRegister}>
        {t("signUp")}
      </CustomButton>
      <CustomFooter />
    </Form>
  );
};

export default SignUp;
