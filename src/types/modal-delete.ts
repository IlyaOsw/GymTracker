import { IExercise } from "./exercise";

export type ModalDeletePropsType = {
  setLoading: (value: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
  category: string;
  setData: (value: IExercise[]) => void;
  isModalOpen: boolean;
  handleCancel: (e: { stopPropagation: () => void }) => void;
  item: IExercise;
  setConfirm: (value: boolean) => void;
  setSelectedExercise: (value: IExercise | null) => void;
};
