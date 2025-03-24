import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { formatDateOfBirth } from "utils/formatDateOfBirth";
import { UserInfoPropsType } from "types/user-info";
import { animation, useAnimatedInView } from "hooks/useAnimatedInView ";
import { EditOutlined } from "@ant-design/icons";
import { SettingButton } from "components/SettingButton/SettingButton";

import { LastWorkout } from "../LastWorkout/LastWorkout";

import { EditProfile } from "./EditProfile/EditProfile";
import styles from "./UserInfo.module.scss";

export const UserInfo: React.FC<UserInfoPropsType> = React.memo(
  ({ userData }) => {
    const { t } = useTranslation();
    const { ref, controls } = useAnimatedInView();
    const [edit, setEdit] = useState<boolean>(false);

    const userProfile = [
      {
        icon:
          process.env.PUBLIC_URL + "/assets/Icons/AdditionalIcons/location.png",
        alt: "Location",
        content: `${userData?.location.country || ""}${
          userData?.location.city ? `, ${userData.location.city}` : ""
        }`,
      },
      {
        icon:
          process.env.PUBLIC_URL + "/assets/Icons/AdditionalIcons/gender.png",
        alt: "Gender",
        content: `${t("gender")}: ${
          userData?.gender ? t(userData.gender) : ""
        }`,
      },
      {
        icon: process.env.PUBLIC_URL + "/assets/Icons/AdditionalIcons/age.png",
        alt: "Age",
        content: `${t("age")}: ${userData?.age}`,
      },
      {
        icon:
          process.env.PUBLIC_URL + "/assets/Icons/AdditionalIcons/birthday.png",
        alt: "DateOfBirth",
        content: `${t("dateOfBirth")}: ${formatDateOfBirth(
          userData?.dateOfBirth
        )}`,
      },
      {
        icon: process.env.PUBLIC_URL + "/assets/Icons/AdditionalIcons/mail.png",
        alt: "Mail",
        content: `${userData?.email || ""}`,
      },
    ];

    return (
      <div className={styles.profileContainer}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={animation}
          className={styles.profileCard}
        >
          <SettingButton
            icon={<EditOutlined />}
            onClick={() => setEdit(true)}
            className={styles.editBtn}
          />
          <div className={styles.userInfo}>
            <h3 className={styles.name}>
              {userData?.firstName} {userData?.lastName}
            </h3>
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
              {userProfile.map((item, index) => (
                <div key={index} className={styles.detailItem}>
                  <img src={item.icon} alt={item.alt} />
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
          </div>
          <LastWorkout />
        </motion.div>
        {edit && <EditProfile onClose={() => setEdit(false)} />}
      </div>
    );
  }
);
