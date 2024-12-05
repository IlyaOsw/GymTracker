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
          const firestore = getFirestore();
          const userID = user ? user.uid : null;

          if (!userID) {
            console.log("User not authenticated");
            return;
          }

          const exercisesDoc = await getDoc(
            doc(firestore, "exercises", userID)
          );
          console.log("Current User ID:", userID);

          const exerciseIds: string[] = [];

          if (exercisesDoc.exists()) {
            const exercisesData = exercisesDoc.data();
            console.log("Exercises Data:", exercisesData);

            const exercises = exercisesData.exercises;
            if (Array.isArray(exercises)) {
              exercises.forEach((exercise: any) => {
                if (exercise.id) {
                  exerciseIds.push(exercise.id);
                }
              });
            }
            console.log("Exercise IDs:", exerciseIds);
          } else {
            console.log("No exercises data found for this user.");
          }

          //------------------------------------------------

          const setsCollectionRef = collection(firestore, "sets");
          const querySnapshot = await getDocs(setsCollectionRef);

          const allWorkoutDates: string[] = [];

          for (const docSnapshot of querySnapshot.docs) {
            const docId = docSnapshot.id;

            if (exerciseIds.includes(docId)) {
              console.log("Matched Set Document ID:", docId);

              const setData = docSnapshot.data();
              console.log("Set Data:", setData);

              if (setData.workouts && Array.isArray(setData.workouts)) {
                setData.workouts.forEach((workout: any) => {
                  if (workout.date) {
                    allWorkoutDates.push(workout.date);
                  }
                });
              } else {
                console.log("No workouts found for this set.");
              }
            }
          }

          if (allWorkoutDates.length > 0) {
            allWorkoutDates.sort(
              (a, b) => new Date(b).getTime() - new Date(a).getTime()
            );
            const latestWorkoutDate = allWorkoutDates[0];
            const formattedDate = new Date(latestWorkoutDate).toLocaleString(
              "ru-RU",
              {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            );
            setLastWorkoutDate(formattedDate);
            console.log("Latest Workout Date:", formattedDate);
          } else {
            console.log("No workouts dates found.");
            setLastWorkoutDate(null);
          }
        } catch (error) {
          console.error("Error fetching sets data:", error);
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
            {t("lastWorkout")}: <br />
            <span>{lastWorkoutDate}</span>
          </div>
        </div>
      )}
    </>
  );
});
