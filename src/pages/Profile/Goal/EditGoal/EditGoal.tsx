import React from "react";
import { SyncOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { CustomModal } from "components/CustomModal/CustomModal";
import { CustomInput } from "components/CustomInput/CustomInput";
import { Calendar } from "components/Calendar/Calendar";
import NumericInput from "components/NumericInput/NumericInput";
import { CustomButton } from "components/CustomButton/CustomButton";
import { IGoalData } from "types/goal-data";
import { parseDate } from "utils/parseDate";
import { handleDateChange } from "utils/handleDateChange";
import { EditGoalPropsType } from "types/edit-goal";

import styles from "./EditGoal.module.scss";

export const EditGoal: React.FC<EditGoalPropsType> = React.memo(
  ({
    editMode,
    goal,
    setGoal,
    currentValue,
    setCurrentValue,
    startWeight,
    setStartWeight,
    startDate,
    setStartDate,
    goalWeight,
    setGoalWeight,
    endDate,
    setEndDate,
    setEditMode,
    goalData,
    setGoalData,
  }) => {
    const { t } = useTranslation();
    const user = getAuth().currentUser;

    const handleSave = async () => {
      try {
        const updatedGoalData: IGoalData = {
          ...goalData,
          id: goalData?.id || uuidv4(),
          goal: goal || "",
          startWeight: startWeight || "0",
          startDate: startDate || "",
          goalWeight: goalWeight || "0",
          endDate: endDate || "",
          currentValue: currentValue || "0",
        };
        if (!user?.uid) return;
        await setDoc(doc(getFirestore(), "goals", user.uid), updatedGoalData);

        setGoalData(updatedGoalData);
        setEditMode(false);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <CustomModal
        open={editMode}
        footer={null}
        onCancel={() => setEditMode(false)}
      >
        <div className={styles.editTitle}>{t("setGoalDescription")}</div>
        <div className={styles.modal}>
          <CustomInput
            text={t("goalTitle")}
            placeholder={t("Describe your goal")}
            value={goal}
            onChange={(value) => setGoal(value)}
          />
          <div className={styles.numericInputBlock}>
            {t("current")}
            <NumericInput
              value={currentValue}
              onChange={(value) => setCurrentValue(value)}
              className={styles.numericInput}
              placeholder={t("currentPh")}
            />
          </div>
          <div className={styles.numericInputBlock}>
            {t("startWeight")}
            <NumericInput
              value={startWeight}
              onChange={(value) => setStartWeight(value)}
              className={styles.numericInput}
              placeholder={t("startWeightPh")}
            />
          </div>
          <div className={styles.startBlock}>
            <span className={styles.inputLabel}>{t("startDate")}</span>
            <Calendar
              value={startDate ? parseDate(startDate) : undefined}
              onChange={handleDateChange(setStartDate)}
            />
          </div>
          <div className={styles.numericInputBlock}>
            {t("goalWeight")}
            <NumericInput
              value={goalWeight}
              onChange={(value) => setGoalWeight(value)}
              className={styles.numericInput}
              placeholder={t("goalWeightPh")}
            />
          </div>
          <div>
            <span className={styles.inputLabel}>{t("endDate")}</span>
            <Calendar
              value={endDate ? parseDate(endDate) : undefined}
              onChange={handleDateChange(setEndDate)}
            />
          </div>
          <CustomButton
            onClick={handleSave}
            icon={<SyncOutlined />}
            className={styles.updateBtn}
          >
            {t("update")}
          </CustomButton>
        </div>
      </CustomModal>
    );
  }
);
