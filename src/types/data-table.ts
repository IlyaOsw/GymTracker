import { LegacyRef } from "react";
import { ExerciseTableType } from "./exercise-table";

export type DataTablePropsType = {
  data: ExerciseTableType[];
  setData: (value: ExerciseTableType[]) => void;
  currentWorkout: boolean;
  editWeight: string | null;
  weightInputRef: LegacyRef<HTMLInputElement> | undefined;
  setEditWeight: (editWeight: string | null) => void;
  editReps: string | null;
  repsInputRef: LegacyRef<HTMLInputElement> | undefined;
  setEditReps: (editReps: string | null) => void;
};
