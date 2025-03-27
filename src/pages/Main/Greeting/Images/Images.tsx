import React from "react";

import styles from "./Images.module.scss";

export const Images: React.FC = () => {
  return (
    <div className={styles.images}>
      <div className={`${styles.topImg}`}>
        <img
          src={process.env.PUBLIC_URL + "/assets/Images/Main1.jpg"}
          alt="Fitness"
        />
      </div>
      <div className={`${styles.bottomImg}`}>
        <img
          src={process.env.PUBLIC_URL + "/assets/Images/Main2.jpg"}
          alt="Fitness"
        />
      </div>
    </div>
  );
};
