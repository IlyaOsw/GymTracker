import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { CheckCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { CustomButton } from "../../components/CustomButton/CustomButton";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { CustomFooter } from "../../layout/CustomFooter/CustomFooter";
import { ResetButton } from "../../components/ResetButton/ResetButton";
import { storage } from "../..";
import { Exercise } from "../../types/types";

import { Registration } from "./Registration/Registration";
import { PersonalInformation } from "./PersonalInformation/PersonalInformation";
import { Address } from "./Address/Address";
import styles from "./SignUp.module.scss";

const defaultExercises: Exercise[] = [
  {
    bestResult: 0,
    category: "Back",
    id: uuidv4(),
    isFavorite: false,
    name: "Pull-down to the chest",
  },
  {
    bestResult: 0,
    category: "Legs",
    id: uuidv4(),
    isFavorite: false,
    name: "Barbell squats",
  },
  {
    bestResult: 0,
    category: "Chest",
    id: uuidv4(),
    isFavorite: false,
    name: "Bench press",
  },
  {
    bestResult: 0,
    category: "Hands",
    id: uuidv4(),
    isFavorite: false,
    name: "Bicep curls",
  },
  {
    bestResult: 0,
    category: "Shoulders",
    id: uuidv4(),
    isFavorite: false,
    name: "Seated dumbbell press",
  },
];

const SignUp: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const auth = getAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const onReset = () => {
    form.resetFields();
    message.success(t("reseted"));
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

  const handleImageChange = (file: File) => setImage(file);

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
        age: calculateAge(dateOfBirth),
        gender: gender,
        location: {
          country: country,
          city: city || "",
        },
      };

      const db = getFirestore();
      await setDoc(doc(db, "users", user.uid), userData);
      await setDoc(doc(db, "exercises", user.uid), {
        exercises: defaultExercises,
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
