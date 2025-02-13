import { IExercise } from "./exercise";

export type DeleteIconPropsType = {
  setLoading: (value: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
  category: string;
  setData: (value: IExercise[]) => void;
  isModalOpen: boolean;
  handleCancel: (e: { stopPropagation: () => void }) => void;
  item: IExercise;
  index: number;
  setSelectedExercise: (value: IExercise | null) => void;
};
