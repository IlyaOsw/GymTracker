import { PlusOutlined } from "@ant-design/icons";
import { message } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

import { CustomButton } from "../../../components/CustomButton/CustomButton";
import { CustomInput } from "../../../components/CustomInput/CustomInput";
import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { IAddExercise } from "../../../types/types";

import styles from "./AddExercise.module.scss";

export const AddExercise: React.FC<IAddExercise> = ({
  onAddExercise,
  category,
}) => {
  const { t } = useTranslation();
  const [, contextHolder] = message.useMessage();
  const [exerciseName, setExerciseName] = useState("");

  const handleAddExercise = async () => {
    if (!exerciseName) {
      message.error({
        key: "limit-error",
        content: t("typeExercise"),
      });
      return;
    }
    try {
      const user = getAuth().currentUser;
      if (user) {
        const userId = user.uid;
        const exercise = {
          id: uuidv4(),
          name: exerciseName,
          category: category,
          bestResult: {
            weight: "0",
            reps: "0",
          },
          isFavorite: false,
        };
        const exercisesDocRef = doc(getFirestore(), "exercises", userId);
        const docSnapshot = await getDoc(exercisesDocRef);

        if (docSnapshot.exists()) {
          await updateDoc(exercisesDocRef, {
            exercises: [...docSnapshot.data().exercises, exercise],
          });
        } else {
          await updateDoc(exercisesDocRef, {
            exercises: [exercise],
          });
        }
        setExerciseName("");
        onAddExercise();
        message.success({
          key: "limit-success",
          content: t("exerciseAdded"),
        });
      }
    } catch (error) {
      message.error({
        key: "limit-error",
        content: t("errorAddingExercise"),
      });
    }
  };

  return (
    <>
      {contextHolder}
      <SubTitle>{t("addAnExercise")}</SubTitle>
      <div className={styles.addExercise}>
        <CustomInput
          value={exerciseName}
          onChange={(value: string) => setExerciseName(value)}
          text={t("exerciseName")}
          placeholder={t("typeExercise")}
        />
        <CustomButton
          className={styles.button}
          icon={<PlusOutlined />}
          onClick={handleAddExercise}
        >
          {t("addExerciseBtn")}
        </CustomButton>
      </div>
    </>
  );
};
