import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Form } from "antd";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { CheckCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import { DescriptionTitle } from "components/DescriptionTitle/DescriptionTitle";
import { CustomButton } from "components/CustomButton/CustomButton";
import { PageWrapper } from "components/PageWrapper/PageWrapper";
import { CustomFooter } from "layout/CustomFooter/CustomFooter";
import { ResetButton } from "components/ResetButton/ResetButton";
import { calculateAge } from "utils/calculateAge";
import { scrollToTop } from "utils/scrollToTop";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";
import { IExercise } from "types/exercise";

import { storage } from "../..";

import { Registration } from "./Registration/Registration";
import { PersonalInformation } from "./PersonalInformation/PersonalInformation";
import { Address } from "./Address/Address";
import styles from "./SignUp.module.scss";

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
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    scrollToTop();
  }, []);

  const exercises = useSelector(
    (state: { exercises: IExercise[] }) => state.exercises
  );

  const onReset = () => {
    form.resetFields();
    ClosableMessage({ type: "success", content: t("reseted") });
    scrollToTop();
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
      await form.validateFields();

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
        status: "",
        sport: "",
        height: "0",
        weight: "0",
        noteText: "",
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
      ClosableMessage({ type: "error", content: t("pleaseModify") });
    }
  };

  return (
    <Form
      form={form}
      name="signUpForm"
      initialValues={{ remember: true }}
      layout="vertical"
      onFinish={handleRegister}
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
          onDateOfBirthChange={handleDateOfBirthChange}
        />
        <Address
          onCountryChange={handleCountryChange}
          onCityChange={handleCityChange}
        />
        <div className={styles.resetBtn}>
          <ResetButton
            children={t("resetForm")}
            onClick={onReset}
            icon={<SyncOutlined />}
          />
        </div>
      </PageWrapper>
      <CustomButton
        className={styles.signUpBtn}
        icon={<CheckCircleOutlined />}
        htmlType="submit"
      >
        {t("signUp")}
      </CustomButton>
      <CustomFooter />
    </Form>
  );
};

export default SignUp;
