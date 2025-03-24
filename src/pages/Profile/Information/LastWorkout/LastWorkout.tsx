import React, { useEffect, useState } from "react";
import { useAuth } from "context/AuthContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useTranslation } from "react-i18next";

import styles from "./LastWorkout.module.scss";

export const LastWorkout: React.FC = React.memo(() => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [lastWorkoutDate, setLastWorkoutDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchSetsData = async () => {
      if (!user) return;
      try {
        const firestore = getFirestore();
        const exercisesDoc = await getDoc(
          doc(firestore, "exercises", user.uid)
        );
        const exerciseIds: string[] = [];

        if (exercisesDoc.exists()) {
          const exercises = exercisesDoc.data()?.exercises || [];
          exercises.forEach((exercise: { id: string }) => {
            if (exercise.id) {
              exerciseIds.push(exercise.id);
            }
          });
        }

        const allWorkoutDates: string[] = [];
        const batchSize = 10;

        for (let i = 0; i < exerciseIds.length; i += batchSize) {
          const batchIds = exerciseIds.slice(i, i + batchSize);
          const setsQuery = query(
            collection(firestore, "sets"),
            where("__name__", "in", batchIds)
          );
          const querySnapshot = await getDocs(setsQuery);
          querySnapshot.forEach((docSnapshot) => {
            const setData = docSnapshot.data();
            if (setData.workouts && Array.isArray(setData.workouts)) {
              setData.workouts.forEach((workout) => {
                if (workout.date) {
                  allWorkoutDates.push(workout.date);
                }
              });
            }
          });
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
          <h3 className={styles.title}>
            {t("lastWorkout")}:<span>{lastWorkoutDate}</span>
          </h3>
        </div>
      )}
    </>
  );
});
