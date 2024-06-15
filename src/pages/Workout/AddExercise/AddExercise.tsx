import { PlusOutlined } from "@ant-design/icons";
import { Form } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { CustomInput } from "../../../components/CustomInput/CustomInput";
import { SubTitle } from "../../../components/SubTitle/SubTitle";

import styles from "./AddExercise.module.scss";

export const AddExercise: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Form form={form} initialValues={{ remember: true }} layout="vertical">
      <SubTitle children={t("addAnExercise")} />
      <div className={styles.addExercise}>
        <CustomInput
          name="exercise"
          text={t("exerciseName")}
          placeholder={t("typeExercise")}
          isRequired={false}
        />
        <CustomButton className={styles.button} icon={<PlusOutlined />}>
          {t("addExerciseBtn")}
        </CustomButton>
      </div>
    </Form>
  );
};
