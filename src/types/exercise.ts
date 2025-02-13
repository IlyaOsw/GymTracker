import { RefObject } from "react";
import { IBestResult } from "./best-result";

export interface IExercise {
  id: string;
  category: string;
  name: string;
  bestResult: IBestResult;
  isFavorite: boolean;
}

export interface IExercisesProps {
  category: string;
  updateTrigger: number;
  onSelectExercise: (exercise: IExercise) => void;
  exercisesRef: RefObject<HTMLDivElement>;
  activeCardId: string | null;
  setActiveCardId: (value: string | null) => void;
  setSelectedExercise: (value: IExercise | null) => void;
  data: IExercise[];
  setData: (value: IExercise[]) => void;
}
