export interface ICustomInputProps<T = string> {
  name?: string;
  text: string;
  placeholder: string;
  isRequired?: boolean;
  className?: string;
  onChange?: (value: T) => void;
  value?: T;
}
