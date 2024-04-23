import React from "react";

import styles from "./Greeting.module.scss";
import { Images } from "./Images/Images";
import { Description } from "./Description/Description";

export const Greeting: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Description />
      <Images />
    </div>
  );
};
