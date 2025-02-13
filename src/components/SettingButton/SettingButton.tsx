import { Button } from "antd";
import React from "react";
import { SettingButtonPropsType } from "types/components/setting-button";

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
