import { Button } from "antd";
import React from "react";

import styles from "./SettingButton.module.scss";

export type SettingButtonPropsType = {
  onClick?: (e: any) => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export const SettingButton: React.FC<SettingButtonPropsType> = ({
  onClick,
  icon,
  children,
  className,
}) => {
  return (
    <Button
      onClick={onClick}
      icon={icon}
      className={`${styles.btn} ${className}`}
    >
      {children}
    </Button>
  );
};
