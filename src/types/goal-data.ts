export interface IGoalData {
  id: string;
  goal: string;
  startWeight: string;
  startDate: string;
  goalWeight: string;
  endDate: string;
  currentValue: string;
}

export type GoalInitialBlockPropsType = {
  setGoalData: (value: IGoalData | undefined) => void;
};
