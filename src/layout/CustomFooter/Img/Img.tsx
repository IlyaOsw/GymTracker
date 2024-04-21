import React from "react";

import styles from "./Img.module.scss";

export const Img: React.FC = () => {
  return (
    <div className={styles.footerImg}>
      <div className={styles.footerTitle}>Unlock Your Potential!</div>
      <img
        src={process.env.PUBLIC_URL + "/assets/Images/FooterImg.jpg"}
        alt="Footer"
      />
    </div>
  );
};
