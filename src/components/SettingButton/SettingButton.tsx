import { Button } from "antd";
import React from "react";

import { SettingButtonPropsType } from "../../types/types";

import styles from "./SettingButton.module.scss";

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
