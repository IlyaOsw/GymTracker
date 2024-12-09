import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useTranslation } from "react-i18next";

import styles from "./LastWorkout.module.scss";

export const LastWorkout: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const [lastWorkoutDate, setLastWorkoutDate] = useState<string | null>(null);
  const user = getAuth().currentUser;

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
              exercises.forEach((exercise: any) => {
                if (exercise.id) {
                  exerciseIds.push(exercise.id);
                }
              });
            }
          }

          const setsCollectionRef = collection(getFirestore(), "sets");
          const querySnapshot = await getDocs(setsCollectionRef);

          const allWorkoutDates: string[] = [];

          for (const docSnapshot of querySnapshot.docs) {
            const docId = docSnapshot.id;

            if (exerciseIds.includes(docId)) {
              const setData = docSnapshot.data();

              if (setData.workouts && Array.isArray(setData.workouts)) {
                setData.workouts.forEach((workout: any) => {
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
            const latestWorkoutDate = allWorkoutDates[0];
            const formattedDate = new Date(
              latestWorkoutDate
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
