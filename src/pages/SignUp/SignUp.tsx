import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { CustomFooter } from "../../layout/CustomFooter/CustomFooter";
import { ResetButton } from "../../components/ResetButton/ResetButton";

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
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const onReset = () => {
    form.resetFields();
    messageApi.open({
      type: "success",
      content: `${t("reseted")}`,
    });
  };

  const handleEmailChange = (email: string) => setEmail(email);

  const handlePasswordChange = (password: string) => setPassword(password);

  const handleFirstNameChange = (value: string) => setFirstName(value);

  const handleLastNameChange = (value: string) => setLastName(value);

  const handleGenderChange = (value: string) => setGender(value);

  const handleDateOfBirthChange = (value: string) => {
    const newDate = new Date(value);
    if (!isNaN(newDate.getTime())) {
      setDateOfBirth(newDate);
    }
  };

  const handleCountryChange = (value: string) => setCountry(value);

  const handleCityChange = (value: string) => setCity(value);

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

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userData = {
        id: userCredential.user.uid,
        email: email,
        firstName: firstName,
        lastName: lastName || "",
        dateOfBirth: dateOfBirth,
        age: calculateAge(dateOfBirth),
        gender: gender,
        location: {
          country: country,
          city: city || "",
        },
      };

      const db = getFirestore();
      await setDoc(doc(db, "users", userCredential.user.uid), userData);
      navigate("/registrationsuccess");
    } catch (error) {
      navigate("/registrationerror");
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

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
        {contextHolder}
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
