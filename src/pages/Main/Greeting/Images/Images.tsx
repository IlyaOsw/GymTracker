import React from "react";

import styles from "./Images.module.scss";

export const Images: React.FC = () => {
  return (
    <div className={styles.images}>
      <div className={`${styles.topImg} animation_item`}>
        <img
          src={process.env.PUBLIC_URL + "/assets/Images/Main1.jpg"}
          alt="Fitness boy"
        />
      </div>
      <div className={`${styles.bottomImg} animation_item`}>
        <img
          src={process.env.PUBLIC_URL + "/assets/Images/Main2.jpg"}
          alt="Fitness girl"
        />
      </div>
    </div>
  );
};
