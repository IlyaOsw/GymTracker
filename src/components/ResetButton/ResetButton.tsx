import React from "react";
import { Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";

import { ResetBtnType } from "../../types/types";

import styles from "./ResetButton.module.scss";

export const ResetButton: React.FC<ResetBtnType> = ({
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
