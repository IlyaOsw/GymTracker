import React from "react";
import { Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";

import styles from "./ResetButton.module.scss";

interface ResetBtnType {
  onClick?: () => void;
  children?: string;
}

export const ResetButton: React.FC<ResetBtnType> = ({ onClick, children }) => {
  return (
    <Button
      danger
      type="primary"
      className={styles.reset}
      onClick={onClick}
      icon={<SyncOutlined />}
    >
      {children}
    </Button>
  );
};
