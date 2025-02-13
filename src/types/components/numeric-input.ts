export interface INumericInputProps {
  value: string | undefined;
  onChange: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  placeholder?: string;
}
