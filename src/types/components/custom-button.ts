import { CSSProperties, MouseEventHandler } from "react";

export interface ICustomButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  htmlType?: "button" | "submit" | "reset" | undefined;
  style?: CSSProperties | undefined;
}
