import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { formatDateOfBirth } from "utils/formatDateOfBirth";
import { UserInfoPropsType } from "types/user-info";
import { animation, useAnimatedInView } from "hooks/useAnimatedInView ";

import { LastWorkout } from "../LastWorkout/LastWorkout";

import styles from "./UserInfo.module.scss";

export const UserInfo: React.FC<UserInfoPropsType> = React.memo(
  ({ userData }) => {
    const { t } = useTranslation();
    const { ref, controls } = useAnimatedInView();

    return (
      <div className={styles.profileContainer}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={animation}
          className={styles.profileCard}
        >
          <div className={styles.userInfo}>
            <h2 className={styles.name}>
              {userData?.firstName} {userData?.lastName}
            </h2>
            <p className={styles.status}>{userData?.status}</p>
            {userData?.sport && (
              <div className={styles.sport}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/Icons/AdditionalIcons/workout.png"
                  }
                  alt="Workout"
                />
                <span>{t(userData?.sport)}</span>
              </div>
            )}
            <div className={styles.userDetails}>
              <div className={styles.detailItem}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/Icons/AdditionalIcons/location.png"
                  }
                  alt="Location"
                />
                {userData?.location.country}
                {userData?.location.city && `, ${userData.location.city}`}
              </div>
              <div className={styles.detailItem}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/Icons/AdditionalIcons/gender.png"
                  }
                  alt="Gender"
                />
                {t("gender")}: {userData?.gender ? t(userData.gender) : ""}
              </div>
              <div className={styles.detailItem}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/Icons/AdditionalIcons/age.png"
                  }
                  alt="Age"
                />
                {t("age")}: {userData?.age}
              </div>
              <div className={styles.detailItem}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/Icons/AdditionalIcons/birthday.png"
                  }
                  alt="DateOfBirth"
                />
                {t("dateOfBirth")}: {formatDateOfBirth(userData?.dateOfBirth)}
              </div>
              <div className={styles.detailItem}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/Icons/AdditionalIcons/mail.png"
                  }
                  alt="Mail"
                />
                {userData?.email}
              </div>
            </div>
          </div>
          <LastWorkout />
        </motion.div>
      </div>
    );
  }
);
