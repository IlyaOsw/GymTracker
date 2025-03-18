export type BMIMainPropsType = {
  weight: string;
  height: string;
  setWeight: (weight: string) => void;
  setHeight: (height: string) => void;
  setResult: (result: number) => void;
};
