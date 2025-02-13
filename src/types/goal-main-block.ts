import { IGoalData } from "./goal-data";

export type GoalMainBlockPropsType = {
  goalData: IGoalData | undefined;
  setGoalData: (value: IGoalData | undefined) => void;
  setGoal: (value: string) => void;
  setCurrentValue: (value: string) => void;
  setStartWeight: (value: string) => void;
  setStartDate: (value: string) => void;
  setGoalWeight: (value: string) => void;
  setEndDate: (value: string) => void;
  setEditMode: (value: boolean) => void;
};
