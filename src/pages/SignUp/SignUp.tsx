import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { CheckCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";

import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { CustomFooter } from "../../layout/CustomFooter/CustomFooter";
import { ResetButton } from "../../components/ResetButton/ResetButton";
import { storage } from "../..";
import { Exercise } from "../../types/types";
import { calculateAge } from "../../utils/calculateAge";

import { Registration } from "./Registration/Registration";
import { PersonalInformation } from "./PersonalInformation/PersonalInformation";
import { Address } from "./Address/Address";
import styles from "./SignUp.module.scss";

const SignUp: React.FC = () => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const auth = getAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const exercises = useSelector(
    (state: { exercises: Exercise[] }) => state.exercises
  );

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const onReset = () => {
    form.resetFields();
    messageApi.open({
      type: "success",
      content: t("reseted"),
    });
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleEmailChange = (email: string) => setEmail(email);

  const handlePasswordChange = (password: string) => setPassword(password);

  const handleFirstNameChange = (value: string) => setFirstName(value);

  const handleLastNameChange = (value: string) => setLastName(value);

  const handleGenderChange = (value: string) => setGender(value);

  const handleDateOfBirthChange = (date: Date | null) => setDateOfBirth(date);

  const handleCountryChange = (value: string) => setCountry(value);

  const handleCityChange = (value: string) => setCity(value);

  const handleImageChange = (file: File) => setImage(file);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (image) {
        const avatarRef = ref(storage, `avatar/${user.uid}`);
        await uploadBytes(avatarRef, image);
      }

      const userData = {
        id: user.uid,
        email: email,
        firstName: firstName,
        lastName: lastName || "",
        dateOfBirth: dateOfBirth,
        age: dateOfBirth ? calculateAge(dateOfBirth) : 0,
        gender: gender,
        location: {
          country: country,
          city: city || "",
        },
      };
      await setDoc(doc(getFirestore(), "users", user.uid), userData);
      await setDoc(doc(getFirestore(), "exercises", user.uid), {
        exercises: exercises,
      });
      navigate("/registrationsuccess");
    } catch (error) {
      navigate("/registrationerror");
    }
  };

  return (
    <Form
      form={form}
      name="signUpForm"
      initialValues={{ remember: true }}
      layout="vertical"
    >
      {contextHolder}
      <PageWrapper>
        <DescriptionTitle text={t("signUp")} textAlign="center" />
        <Registration
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          onImageChange={handleImageChange}
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
        <ResetButton
          children={t("resetForm")}
          onClick={onReset}
          icon={<SyncOutlined />}
        />
      </PageWrapper>
      <CustomButton
        className={styles.signUpBtn}
        onClick={handleRegister}
        icon={<CheckCircleOutlined />}
      >
        {t("signUp")}
      </CustomButton>
      <CustomFooter />
    </Form>
  );
};

export default SignUp;
