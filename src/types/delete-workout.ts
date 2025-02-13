import { ExerciseTableType } from "./exercise-table";
import { IExercise } from "./exercise";

export interface IDeleteWorkoutProps {
  workoutDate: string | null;
  selectedExercise: IExercise | null;
  setData: (value: ExerciseTableType[]) => void;
  setWorkoutDate: (workoutDate: string | null) => void;
  setSelectedExercise: (value: IExercise | null) => void;
  setActiveCardId: (value: string | null) => void;
}
