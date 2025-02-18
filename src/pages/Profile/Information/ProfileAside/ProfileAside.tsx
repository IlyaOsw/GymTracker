import React from "react";
import { ProfileAsidePropsType } from "types/profile-aside";

import { Physique } from "./Physique/Physique";
import { FavoriteExercises } from "./FavoriteExercises/FavoriteExercises";
import { Notes } from "./Notes/Notes";
import styles from "./ProfileAside.module.scss";

export const ProfileAside: React.FC<ProfileAsidePropsType> = ({ userData }) => {
  return (
    <div className={styles.aside}>
      <Physique userData={userData} />
      <FavoriteExercises />
      <Notes userData={userData} />
    </div>
  );
};
