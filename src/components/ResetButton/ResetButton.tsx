import React from "react";
import { Button } from "antd";
import { IResetButtonType } from "types/components/reset-button";

import styles from "./ResetButton.module.scss";

export const ResetButton: React.FC<IResetButtonType> = ({
  onClick,
  children,
  icon,
  className,
}) => {
  return (
    <Button
      className={`${styles.reset} ${className}`}
      onClick={onClick}
      icon={icon}
    >
      {children}
    </Button>
  );
};
