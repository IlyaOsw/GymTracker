import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useTranslation } from "react-i18next";

import styles from "./LastWorkout.module.scss";

export const LastWorkout: React.FC = () => {
  const { t } = useTranslation();
  const [lastWorkoutDate, setLastWorkoutDate] = useState<string | null>(null);
  const user = getAuth().currentUser;

  useEffect(() => {
    const fetchLastWorkoutDate = async () => {
      if (user) {
        try {
          const firestore = getFirestore();

          const setsCollectionRef = collection(firestore, "sets");
          const querySnapshot = await getDocs(setsCollectionRef);

          let mostRecentDate: Date | null = null;

          for (const docSnapshot of querySnapshot.docs) {
            const workouts = docSnapshot.data().workouts;

            if (Array.isArray(workouts)) {
              for (const workout of workouts) {
                const workoutDate = new Date(workout.date);

                if (!mostRecentDate || workoutDate > mostRecentDate) {
                  mostRecentDate = workoutDate;
                }
              }
            }
          }

          if (mostRecentDate) {
            setLastWorkoutDate(mostRecentDate.toLocaleDateString());
          } else {
            setLastWorkoutDate(null);
          }
        } catch (error) {
          setLastWorkoutDate(null);
        }
      }
    };
    fetchLastWorkoutDate();
  }, [user]);

  return (
    <div className={styles.wrapper}>
      <img
        src={
          process.env.PUBLIC_URL +
          "/assets/Icons/AdditionalIcons/lastWorkout.png"
        }
        alt="LastWorkout"
      />
      <div className={styles.title}>
        {t("lastWorkout")}:{" "}
        <span>{lastWorkoutDate ? lastWorkoutDate : "No workouts found"}</span>
      </div>
    </div>
  );
};
