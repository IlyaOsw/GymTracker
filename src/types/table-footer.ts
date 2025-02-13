import { ExerciseTableType } from "./exercise-table";
import { IExercise } from "./exercise";

export type TableFooterPropsType = {
  selectedExercise: IExercise | null;
  data: ExerciseTableType[];
  setData: (value: ExerciseTableType[]) => void;
  setEditWeight: (value: string | null) => void;
  saveExerciseData: () => void;
  onWorkoutDateChange: (date: string) => void;
  setCurrentWorkout: (currentWorkout: boolean) => void;
  addRowBtn: boolean;
  setAddRowBtn: (addRowBtn: boolean) => void;
  saveBtn: boolean;
  setSaveBtn: (saveBtn: boolean) => void;
  setDeleteBtn: (deleteBtn: boolean) => void;
  showHistory: boolean;
  setShowHistory: (showHistory: boolean) => void;
};
