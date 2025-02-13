import { IExercise } from "./exercise";

export type ExerciseTableType = {
  key: string;
  weight: string;
  set: number;
  reps: string;
  icon: JSX.Element;
};

export type ExerciseTablePropsType = {
  selectedExercise: IExercise | null;
  setSelectedExercise: (value: IExercise | null) => void;
  setActiveCardId: (value: string | null) => void;
};
