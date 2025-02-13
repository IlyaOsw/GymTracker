import { IGoalData } from "./goal-data";

export type EditGoalPropsType = {
  editMode: boolean;
  goal: string | undefined;
  setGoal: (value: string) => void;
  currentValue: string | undefined;
  setCurrentValue: (value: string) => void;
  startWeight: string | undefined;
  setStartWeight: (value: string) => void;
  startDate: string | undefined;
  setStartDate: (value: string) => void;
  goalWeight: string | undefined;
  setGoalWeight: (value: string) => void;
  endDate: string | undefined;
  setEndDate: (value: string) => void;
  setEditMode: (value: boolean) => void;
  goalData: IGoalData | undefined;
  setGoalData: (value: IGoalData | undefined) => void;
};
