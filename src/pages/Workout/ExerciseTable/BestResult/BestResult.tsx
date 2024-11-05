import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { SettingButton } from "../../../../components/SettingButton/SettingButton";
import NumericInput from "../../../../components/NumericInput/NumericInput";
import { BestResultProps, Exercise } from "../../../../types/types";
import { ClosableMessage } from "../../../../components/ClosableMessage/ClosableMessage";
import { Hexagon } from "../../../../components/Hexagon/Hexagon";

import styles from "./BestResult.module.scss";

export const BestResult: React.FC<BestResultProps> = ({
  bestResult,
  selectedExercise,
  setBestResult,
}) => {
  const { t } = useTranslation();
  const user = getAuth().currentUser;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [weight, setWeight] = useState<string>(bestResult?.weight || "0");
  const [reps, setReps] = useState<string>(bestResult?.reps || "0");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    setWeight(bestResult?.weight || "0");
    setReps(bestResult?.reps || "0");
  }, [bestResult]);

  const saveBestResult = async (updatedBestResult: {
    weight: string;
    reps: string;
  }) => {
    if (user && selectedExercise && !isSaving) {
      setIsSaving(true);
      const exercisesDocRef = doc(getFirestore(), "exercises", user.uid);
      try {
        const exercisesDoc = await getDoc(exercisesDocRef);
        if (exercisesDoc.exists()) {
          const exercisesData = exercisesDoc.data();
          const exerciseToUpdate = exercisesData.exercises.find(
            (exercise: Exercise) => exercise.id === selectedExercise.id
          );

          if (
            exerciseToUpdate.bestResult.weight === updatedBestResult.weight &&
            exerciseToUpdate.bestResult.reps === updatedBestResult.reps
          ) {
            ClosableMessage({
              type: "info",
              content: t("noChangesDetected"),
            });
            setIsSaving(false);
            return;
          }

          if (Number(updatedBestResult.reps) === 0) {
            setReps(exerciseToUpdate.bestResult.reps);
            ClosableMessage({
              type: "error",
              content: t("repsNot0"),
            });
            setIsSaving(false);
            return;
          }

          const updatedExercises = exercisesData.exercises.map(
            (exercise: Exercise) => {
              if (exercise.id === selectedExercise.id) {
                return {
                  ...exercise,
                  bestResult: updatedBestResult,
                };
              }
              return exercise;
            }
          );

          await updateDoc(exercisesDocRef, { exercises: updatedExercises });
          setBestResult(updatedBestResult);
          ClosableMessage({
            type: "success",
            content: t("recordUpdated"),
          });
        } else {
          ClosableMessage({
            type: "error",
            content: t("noExercisesFound"),
          });
        }
      } catch (error) {
        ClosableMessage({
          type: "error",
          content: t("errorSavingBestResult"),
        });
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleSave = async () => {
    if (!isSaving) {
      await saveBestResult({ weight, reps });
      setEditMode(false);
    }
  };

  const genExtra = () => (
    <img
      src={process.env.PUBLIC_URL + "/assets/Icons/AdditionalIcons/trophy.png"}
    />
  );

  const items = [
    {
      key: "1",
      label: <div className={styles.title}>{t("bestExerciseResult")}</div>,
      children: (
        <>
          {editMode ? (
            <>
              <div className={styles.wrapper}>
                <div>
                  <NumericInput value={weight} onChange={setWeight} />
                  <span>{t("kg")}</span>
                </div>
                <div>
                  <NumericInput
                    value={reps}
                    onChange={setReps}
                    onBlur={handleSave}
                  />
                  <span>{t("bestResultReps")}</span>
                </div>
              </div>
              <SettingButton
                icon={<CheckOutlined />}
                onClick={handleSave}
                className={styles.saveRecord}
              >
                <span>{t("saveRecord")}</span>
              </SettingButton>
            </>
          ) : (
            <>
              <div className={styles.wrapper}>
                <div>
                  <div className={styles.hexagonTitle}>{t("userWeight")}</div>
                  <div className={styles.hexagonContainer}>
                    <Hexagon text={weight} className={styles.hexagon} />
                  </div>
                </div>
                <div>
                  <div className={styles.hexagonTitle}>{t("reps")}</div>
                  <div className={styles.hexagonContainer}>
                    <Hexagon text={reps} className={styles.hexagon} />
                  </div>
                </div>
              </div>

              <SettingButton
                icon={<EditOutlined />}
                onClick={() => setEditMode(true)}
                className={styles.updateRecord}
              >
                <span>{t("updateRecord")}</span>
              </SettingButton>
            </>
          )}
        </>
      ),
      extra: genExtra(),
    },
  ];

  return (
    <div className={styles.collapse}>
      <Collapse items={items} bordered={false} />
    </div>
  );
};
