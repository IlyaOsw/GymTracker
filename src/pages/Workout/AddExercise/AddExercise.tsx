import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { CustomButton } from "components/CustomButton/CustomButton";
import { CustomInput } from "components/CustomInput/CustomInput";
import { SubTitle } from "components/SubTitle/SubTitle";
import { IAddExercise } from "types/add-exercise";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";

import styles from "./AddExercise.module.scss";

export const AddExercise: React.FC<IAddExercise> = React.memo(
  ({ onAddExercise, category, setData }) => {
    const user = getAuth().currentUser;
    const { t } = useTranslation();
    const [exerciseName, setExerciseName] = useState("");

    const handleAddExercise = async () => {
      if (!exerciseName) {
        ClosableMessage({ type: "error", content: t("typeExercise") });
        return;
      }
      try {
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
            const existingExercises = docSnapshot.data().exercises || [];

            const exercisesInCategory = existingExercises.filter(
              (existingExercise: { category: string }) =>
                existingExercise.category === category
            );

            if (exerciseName.length <= 2) {
              ClosableMessage({
                type: "error",
                content: t("nameMin3Symbols"),
              });
              return;
            }

            if (exercisesInCategory.length >= 10) {
              ClosableMessage({
                type: "error",
                content: t("maxExercisesReached"),
              });
              return;
            }

            const exerciseExists = existingExercises.some(
              (existingExercise: { name: string }) =>
                existingExercise.name.toLowerCase() ===
                exerciseName.toLowerCase()
            );

            if (exerciseExists) {
              ClosableMessage({
                type: "error",
                content: t("nameAlreadyExists"),
              });
              setExerciseName("");
              return;
            }

            await updateDoc(exercisesDocRef, {
              exercises: [...existingExercises, exercise],
            });

            const filteredData = [...existingExercises, exercise].filter(
              (exercise: { category: string }) =>
                t(exercise.category) === t(category)
            );
            setData(filteredData);
          } else {
            await updateDoc(exercisesDocRef, {
              exercises: [exercise],
            });
            setData([exercise]);
          }

          setExerciseName("");
          onAddExercise();
          ClosableMessage({ type: "success", content: t("exerciseAdded") });
        }
      } catch (error) {
        ClosableMessage({ type: "error", content: t("errorAddingExercise") });
      }
    };

    return (
      <>
        <SubTitle>{t("addAnExercise")}</SubTitle>
        <div className={styles.addExercise}>
          <CustomInput
            value={exerciseName}
            onChange={(value: string) => setExerciseName(value)}
            text={t("exerciseName")}
            placeholder={t("typeExercise")}
          />
          <CustomButton icon={<PlusOutlined />} onClick={handleAddExercise}>
            {t("addExerciseBtn")}
          </CustomButton>
        </div>
      </>
    );
  }
);
