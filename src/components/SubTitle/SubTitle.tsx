import React from "react";

import styles from "./SubTitle.module.scss";

interface SubTitleType {
  children: string;
  className?: string;
}

export const SubTitle: React.FC<SubTitleType> = ({ children, className }) => {
  return <p className={`${styles.subTitle} ${className}`}>{children}</p>;
};
