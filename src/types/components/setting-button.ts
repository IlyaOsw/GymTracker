import { MouseEventHandler } from "react";

export type SettingButtonPropsType = {
  onClick?: MouseEventHandler<HTMLElement> | undefined;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};
