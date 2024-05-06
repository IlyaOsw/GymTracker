import React from "react";

import styles from "./SubTitle.module.scss";

export const SubTitle: React.FC<{ children: string }> = ({ children }) => {
  return <p className={styles.subTitle}>{children}</p>;
};
