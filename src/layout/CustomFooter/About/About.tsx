import React from "react";

import styles from "./About.module.scss";
import { Contacts } from "./Contacts/Contacts";
import { Logo } from "./Logo/Logo";
import { Media } from "./Media/Media";

export const About: React.FC = () => {
  return (
    <div className={styles.main}>
      <Contacts />
      <Logo />
      <Media />
    </div>
  );
};
