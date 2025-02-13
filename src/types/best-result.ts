import { IExercise } from "./exercise";

export interface IBestResult {
  weight: string;
  reps: string;
}

export interface IBestResultProps {
  bestResult: {
    weight: string;
    reps: string;
  } | null;
  selectedExercise: IExercise | null;
  setBestResult: (value: IBestResult) => void;
}
