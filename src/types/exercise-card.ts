import { RefObject } from "react";

import { IExercise } from "./exercise";

export type ExerciseCardPropsType = {
  item: IExercise;
  onSelectExercise: (item: IExercise) => void;
  category: string;
  setData: (value: IExercise[]) => void;
  setLoading: (value: boolean) => void;
  activeCardId: string | null;
  setActiveCardId: (value: string | null) => void;
  index: number;
  exercisesRef: RefObject<HTMLDivElement>;
  setSelectedExercise: (value: IExercise | null) => void;
};
