import React from "react";

import styles from "./About.module.scss";
import { Contacts } from "./Contacts/Contacts";
import { SocialMedia } from "./SocialMedia/SocialMedia";
import { DevelopedBy } from "./DevelopedBy/DevelopedBy";

export const About: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Contacts />
      <DevelopedBy />
      <SocialMedia />
    </div>
  );
};
