import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import { SubTitle } from "../../../../components/SubTitle/SubTitle";
import { FavoriteExercisesType } from "../../../../types/types";
import { CustomButton } from "../../../../components/CustomButton/CustomButton";

import styles from "./FavoriteExercises.module.scss";
import { AddExercise } from "./AddExercise/AddExercise";

export const FavoriteExercises: React.FC = () => {
  const { t } = useTranslation();
  const [favoriteExercisesArray, setFavoriteExercisesArray] = useState<
    FavoriteExercisesType[]
  >([
    { id: 1, name: "Bench press", result: "125" },
    { id: 2, name: "Squat", result: "155" },
    { id: 3, name: "Deadlift", result: "180" },
  ]);

  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const addFavoriteExercise = () => {
    if (favoriteExercisesArray.length < 3) {
      setShowAddModal(true);
    }
  };

  const deleteFavoriteExercise = (id: number) => {
    setFavoriteExercisesArray((prevExercises) =>
      prevExercises.filter((exercise) => exercise.id !== id)
    );
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
      {favoriteExercisesArray.length < 3 && (
        <CustomButton onClick={addFavoriteExercise} icon={<PlusOutlined />}>
          {t("addExerciseBtn")}
        </CustomButton>
      )}
      {showAddModal && (
        <AddExercise
          setFavoriteExercisesArray={setFavoriteExercisesArray}
          setShowAddModal={setShowAddModal}
          showAddModal={showAddModal}
        />
      )}
    </div>
  );
};
