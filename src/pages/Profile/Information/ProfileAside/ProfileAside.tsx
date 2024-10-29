import React from "react";

import { Physique } from "./Physique/Physique";
import { FavoriteExercises } from "./FavoriteExercises/FavoriteExercises";
import styles from "./ProfileAside.module.scss";

export const ProfileAside: React.FC = () => {
  return (
    <div className={styles.aside}>
      <Physique />
      <FavoriteExercises />
    </div>
  );
};
