import React from "react";

import { ProfileAsidePropsType } from "../../../../types/profile-aside";

import { Physique } from "./Physique/Physique";
import { FavoriteExercises } from "./FavoriteExercises/FavoriteExercises";
import styles from "./ProfileAside.module.scss";

export const ProfileAside: React.FC<ProfileAsidePropsType> = ({ userData }) => {
  return (
    <div className={styles.aside}>
      <Physique userData={userData} />
      <FavoriteExercises />
    </div>
  );
};
