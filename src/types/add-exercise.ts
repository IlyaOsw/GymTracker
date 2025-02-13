import { IExercise } from "./exercise";

export interface IAddExercise {
  category: string;
  onAddExercise: () => void;
  setData: (value: IExercise[]) => void;
}
