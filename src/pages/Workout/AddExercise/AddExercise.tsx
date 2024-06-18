import { PlusOutlined } from "@ant-design/icons";
import { notification, Form, message } from "antd";
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
  const [exerciseName, setExerciseName] = useState("");

  const handleAddExercise = async () => {
    if (!exerciseName) {
      notification.error({ message: t("typeExercise") });
      return;
    }

    try {
      const db = getFirestore();
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        const exercise = {
          id: uuidv4(),
          name: exerciseName,
          category: category,
          bestResult: 0,
          isFavorite: false,
        };

        const exercisesDocRef = doc(db, "exercises", userId);
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
        message.success(t("exerciseAdded"));
        setExerciseName("");
        onAddExercise();
      } else {
        message.error(t("userNotAuthenticated"));
      }
    } catch (error) {
      message.error(t("errorAddingExercise"));
    }
  };

  const handleInputChange = (value: string) => {
    setExerciseName(value);
  };

  return (
    <div>
      <SubTitle>{t("addAnExercise")}</SubTitle>
      <div className={styles.addExercise}>
        <CustomInput
          value={exerciseName}
          onChange={handleInputChange}
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
    </div>
  );
};
