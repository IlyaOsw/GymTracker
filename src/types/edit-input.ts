import { IExercise } from "./exercise";

export type EditInputPropsType = {
  newName: string;
  editMode: boolean;
  currentEditingId: string | null;
  setCurrentEditingId: (value: string | null) => void;
  category: string;
  setData: (value: IExercise[]) => void;
  setEditMode: (value: boolean) => void;
  setNewName: (value: string) => void;
};
