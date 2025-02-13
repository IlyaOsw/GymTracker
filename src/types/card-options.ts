import { IExercise } from "./exercise";

export type CardOptionsPropsType = {
  item: IExercise;
  category: string;
  setData: (value: IExercise[]) => void;
  setCurrentEditingId: (value: string | null) => void;
  setNewName: (value: string) => void;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
};
