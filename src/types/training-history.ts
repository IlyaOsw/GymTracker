import { ExerciseTableType } from "./exercise-table";

export type TrainingHistoryPropsType = {
  showHistory: boolean;
  workouts: ExerciseTableType[][];
  workoutDates: string[];
};
