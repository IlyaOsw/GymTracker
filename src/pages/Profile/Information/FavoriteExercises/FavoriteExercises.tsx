import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import { SubTitle } from "../../../../components/SubTitle/SubTitle";
import { FavoriteExercisesType } from "../../../../types/types";
import { CustomButton } from "../../../../components/CustomButton/CustomButton";

import { CustomInput } from "../../../../components/CustomInput/CustomInput";

import styles from "./FavoriteExercises.module.scss";

export const FavoriteExercises: React.FC = () => {
  const { t } = useTranslation();
  const [favoriteExercisesArray, setFavoriteExercisesArray] = useState<
    FavoriteExercisesType[]
  >([
    { id: 1, name: "Bench press", result: "125" },
    { id: 2, name: "Squat", result: "155" },
    { id: 3, name: "Deadlift", result: "180" },
  ]);
  const [showAddModal, setshowAddModal] = useState<boolean>(false);
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

  const addFavoriteExercise = () => {
    if (favoriteExercisesArray.length < 4) {
      setshowAddModal(true);
    }
  };

  const deleteFavoriteExercise = (id: number) => {
    setFavoriteExercisesArray((prevExercises) =>
      prevExercises.filter((exercise) => exercise.id !== id)
    );
  };

  const handleAddExercise = () => {
    if (newExercise.name && newExercise.result) {
      setFavoriteExercisesArray((prevExercises) => [
        ...prevExercises,
        { ...newExercise, id: prevExercises.length + 1 },
      ]);
      setNewExercise({ id: 0, name: "", result: "" });
      setshowAddModal(false);
    }
  };

  return (
    <div className={styles.exercises}>
      <SubTitle children={t("favoriteExercises")} />
      {favoriteExercisesArray.map((item) => (
        <div key={item.id} className={styles.exercisesBox}>
          <div className={styles.exerciseName}>{item.name}</div>
          <div className={styles.exerciseResult}>
            {t("bestResult")} {item.result} {t("kg")}
          </div>
          <Tooltip title={t("deleteRow")}>
            <DeleteOutlined
              className={styles.deleteIcon}
              onClick={() => deleteFavoriteExercise(item.id)}
            />
          </Tooltip>
        </div>
      ))}
      {favoriteExercisesArray.length < 4 && (
        <CustomButton onClick={addFavoriteExercise} icon={<PlusOutlined />}>
          {t("addExerciseBtn")}
        </CustomButton>
      )}
      {showAddModal && (
        <>
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
          <CustomButton onClick={handleAddExercise}>{t("save")}</CustomButton>
        </>
      )}
    </div>
  );
};
