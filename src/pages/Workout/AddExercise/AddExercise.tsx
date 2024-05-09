import { PlusOutlined } from "@ant-design/icons";
import { Form } from "antd";
import React from "react";

import { useTranslation } from "react-i18next";

import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { CustomInput } from "../../../components/CustomInput/CustomInput";
import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { Calendar } from "../../../components/Calendar/Calendar";

import styles from "./AddExercise.module.scss";

export const AddExercise: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <>
      <SubTitle children={t("addAnExercise")} />
      <Form form={form} initialValues={{ remember: true }} layout="vertical">
        <div className={styles.addExercise}>
          <CustomInput
            name={"Exercise"}
            text={t("exerciseName")}
            placeholder={t("typeExercise")}
            isRequired={true}
          />
          <Form.Item
            name={"Enter date"}
            label={<span className={styles.inputLabel}>{t("enterDate")}</span>}
          >
            <Calendar />
          </Form.Item>
          <CustomButton icon={<PlusOutlined />}>
            {t("addExerciseBtn")}
          </CustomButton>
        </div>
      </Form>
    </>
  );
};
