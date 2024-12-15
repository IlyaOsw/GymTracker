import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import { SubTitle } from "../../../components/SubTitle/SubTitle";
import { IGoalData } from "../../../types/types";

import { EditGoal } from "./EditGoal/EditGoal";
import styles from "./Goal.module.scss";
import { GoalInitialBlock } from "./GoalInitialBlock/GoalInitialBlock";
import { GoalMainBlock } from "./GoalMainBlock/GoalMainBlock";

export const Goal: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const user = getAuth().currentUser;
  const [goalData, setGoalData] = useState<IGoalData>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [goal, setGoal] = useState<string>();
  const [currentValue, setCurrentValue] = useState<string>();
  const [startWeight, setStartWeight] = useState<string | undefined>();
  const [startDate, setStartDate] = useState<string | undefined>();
  const [goalWeight, setGoalWeight] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();

  useEffect(() => {
    const fetchGoal = async () => {
      if (!user) return;
      const userGoalRef = doc(getFirestore(), "goals", user.uid);

      try {
        const docSnapshot = await getDoc(userGoalRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data() as IGoalData;
          setGoalData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchGoal();
  }, [user]);

  return (
    <>
      <div className={styles.container}>
        <SubTitle>{t("goalTracker")}</SubTitle>
        {goalData ? (
          <GoalMainBlock
            goalData={goalData}
            setGoalData={setGoalData}
            setGoal={setGoal}
            setCurrentValue={setCurrentValue}
            setStartWeight={setStartWeight}
            setStartDate={setStartDate}
            setGoalWeight={setGoalWeight}
            setEndDate={setEndDate}
            setEditMode={setEditMode}
          />
        ) : (
          <GoalInitialBlock setGoalData={setGoalData} />
        )}
      </div>
      {editMode && (
        <EditGoal
          editMode={editMode}
          goal={goal}
          setGoal={setGoal}
          currentValue={currentValue}
          setCurrentValue={setCurrentValue}
          startWeight={startWeight}
          setStartWeight={setStartWeight}
          startDate={startDate}
          setStartDate={setStartDate}
          goalWeight={goalWeight}
          setGoalWeight={setGoalWeight}
          endDate={endDate}
          setEndDate={setEndDate}
          setEditMode={setEditMode}
          goalData={goalData}
          setGoalData={setGoalData}
        />
      )}
    </>
  );
});
