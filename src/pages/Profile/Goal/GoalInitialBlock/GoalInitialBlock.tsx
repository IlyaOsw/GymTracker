import React from "react";
import { useTranslation } from "react-i18next";
import { RiseOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { CustomButton } from "../../../../components/CustomButton/CustomButton";
import {
  GoalInitialBlockPropsType,
  IGoalData,
} from "../../../../types/goal-data";

export const GoalInitialBlock: React.FC<GoalInitialBlockPropsType> = React.memo(
  ({ setGoalData }) => {
    const user = getAuth().currentUser;
    const { t } = useTranslation();

    const handleSetGoal = async () => {
      try {
        const newGoalData: IGoalData = {
          id: uuidv4(),
          goal: t("Describe your goal"),
          startWeight: "0",
          startDate: "00.00.00",
          goalWeight: "0",
          endDate: "00.00.00",
          currentValue: "0",
        };

        const goalRef = doc(collection(getFirestore(), "goals"), user?.uid);
        await setDoc(goalRef, newGoalData);

        setGoalData(newGoalData);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <>
        <p> {t("trackProgress")}</p>
        <CustomButton
          icon={<RiseOutlined />}
          onClick={handleSetGoal}
          style={{ margin: "25px auto" }}
        >
          {t("setGoal")}
        </CustomButton>
      </>
    );
  }
);
