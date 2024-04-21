import React from "react";

import styles from "../About.module.scss";

export const Logo: React.FC = () => {
  return (
    <div className={styles.logo}>
      <img
        src={process.env.PUBLIC_URL + "/assets/Logo/LogoMainMobile.svg"}
        alt="Logo Mobile"
      />
      <span className={styles.logoDescription}>Developed by IBTech ©</span>
    </div>
  );
};
