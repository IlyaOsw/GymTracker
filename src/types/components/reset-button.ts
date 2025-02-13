import { MouseEventHandler, ReactNode } from "react";

export interface IResetButtonType {
  onClick: MouseEventHandler<HTMLElement> | undefined;
  children: string;
  icon: ReactNode;
}
