import React from "react";
import { Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";

import { ResetBtnType } from "../../types/types";

import styles from "./ResetButton.module.scss";

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
