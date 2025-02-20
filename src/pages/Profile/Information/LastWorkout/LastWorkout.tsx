import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useTranslation } from "react-i18next";

import styles from "./LastWorkout.module.scss";

export const LastWorkout: React.FC = React.memo(() => {
  const user = getAuth().currentUser;
  const { t } = useTranslation();
  const [lastWorkoutDate, setLastWorkoutDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchSetsData = async () => {
      if (user) {
        try {
          const userID = user ? user.uid : null;
          if (!userID) return;

          const exercisesDoc = await getDoc(
            doc(getFirestore(), "exercises", userID)
          );
          const exerciseIds: string[] = [];

          if (exercisesDoc.exists()) {
            const exercisesData = exercisesDoc.data();

            const exercises = exercisesData.exercises;
            if (Array.isArray(exercises)) {
              exercises.forEach((exercise) => {
                if (exercise.id) {
                  exerciseIds.push(exercise.id);
                }
              });
            }
          }
          const querySnapshot = await getDocs(
            collection(getFirestore(), "sets")
          );
          const allWorkoutDates: string[] = [];

          for (const docSnapshot of querySnapshot.docs) {
            if (exerciseIds.includes(docSnapshot.id)) {
              const setData = docSnapshot.data();

              if (setData.workouts && Array.isArray(setData.workouts)) {
                setData.workouts.forEach((workout) => {
                  if (workout.date) {
                    allWorkoutDates.push(workout.date);
                  }
                });
              }
            }
          }

          if (allWorkoutDates.length > 0) {
            allWorkoutDates.sort(
              (a, b) => new Date(b).getTime() - new Date(a).getTime()
            );
            const formattedDate = new Date(
              allWorkoutDates[0]
            ).toLocaleDateString();
            setLastWorkoutDate(formattedDate);
          } else {
            setLastWorkoutDate(null);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchSetsData();
  }, [user]);

  return (
    <>
      {lastWorkoutDate && (
        <div className={styles.wrapper}>
          <img
            src={
              process.env.PUBLIC_URL +
              "/assets/Icons/AdditionalIcons/lastWorkout.png"
            }
            alt="LastWorkout"
          />
          <div className={styles.title}>
            {t("lastWorkout")}:<span>{lastWorkoutDate}</span>
          </div>
        </div>
      )}
    </>
  );
});
