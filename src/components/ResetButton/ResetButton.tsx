import React from "react";
import { Button } from "antd";

import { IResetButtonType } from "../../types/types";

import styles from "./ResetButton.module.scss";

export const ResetButton: React.FC<IResetButtonType> = ({
  onClick,
  children,
  icon,
}) => {
  return (
    <Button className={styles.reset} onClick={onClick} icon={icon}>
      {children}
    </Button>
  );
};
