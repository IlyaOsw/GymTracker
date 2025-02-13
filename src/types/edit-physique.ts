export type EditPhysiquePropsType = {
  height: string | undefined;
  weight: string | undefined;
  initialHeight: string | undefined;
  initialWeight: string | undefined;
  setEditMode: (value: boolean) => void;
  setInitialHeight: (initialHeight: string | undefined) => void;
  setInitialWeight: (initialWeight: string | undefined) => void;
  setHeight: (height: string | undefined) => void;
  setWeight: (weight: string | undefined) => void;
};
