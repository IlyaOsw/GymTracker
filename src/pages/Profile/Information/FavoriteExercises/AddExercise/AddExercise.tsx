import React, { useState } from "react";
import { ConfigProvider, Modal, message } from "antd";
import { useTranslation } from "react-i18next";

import { CustomInput } from "../../../../../components/CustomInput/CustomInput";
import { CustomButton } from "../../../../../components/CustomButton/CustomButton";
import {
  AddExercisePropsType,
  FavoriteExercisesType,
} from "../../../../../types/types";

import styles from "./AddExercise.module.scss";

export const AddExercise: React.FC<AddExercisePropsType> = ({
  setFavoriteExercisesArray,
  setShowAddModal,
  showAddModal,
}) => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  const [newExercise, setNewExercise] = useState<FavoriteExercisesType>({
    id: 0,
    name: "",
    result: "",
  });

  const handleNameChange = (value: string) => {
    setNewExercise((prevExercise) => ({ ...prevExercise, name: value }));
  };

  const handleResultChange = (value: string) => {
    setNewExercise((prevExercise) => ({ ...prevExercise, result: value }));
  };

  const handleAddExercise = () => {
    if (newExercise.name && newExercise.result) {
      setFavoriteExercisesArray((prevExercises: FavoriteExercisesType[]) => [
        ...prevExercises,
        { ...newExercise, id: prevExercises.length + 1 },
      ]);
      setNewExercise({ id: 0, name: "", result: "" });
      setShowAddModal(false);
    }

    messageApi.open({
      type: "error",
      content: `${t("addExerciseError")}`,
    });
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "#141414",
            colorIcon: "#0097B2",
            colorIconHover: "red",
          },
        },
      }}
    >
      <Modal
        open={showAddModal}
        footer={null}
        onCancel={() => setShowAddModal(false)}
        style={{ marginTop: "50px" }}
      >
        <div className={styles.modal}>
          <CustomInput
            text={t("exerciseName")}
            value={newExercise.name}
            onChange={handleNameChange}
          />
          <CustomInput
            text={t("yourBestResult")}
            value={newExercise.result}
            onChange={handleResultChange}
          />
          {contextHolder}
          <CustomButton onClick={handleAddExercise}>{t("save")}</CustomButton>
        </div>
      </Modal>
    </ConfigProvider>
  );
};
