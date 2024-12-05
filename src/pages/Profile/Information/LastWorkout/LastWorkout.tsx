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
    const fetchLastWorkoutDate = async () => {
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

          const exerciseIds: any = [];

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
          }

          //------------------------------------------------
          const setsCollectionRef = collection(firestore, "sets");
          const querySnapshot = await getDocs(setsCollectionRef);

          let latestWorkoutDate: string | null = null;

          querySnapshot.forEach((docSnapshot) => {
            const setData = docSnapshot.data();

            if (exerciseIds.includes(docSnapshot.id)) {
              console.log(`Matched Set ID:`, docSnapshot.id, setData);
            }

            if (Array.isArray(setData.workouts)) {
              setData.workouts.forEach((workout: any) => {
                const workoutDate = workout.date;

                if (
                  !latestWorkoutDate ||
                  new Date(workoutDate) > new Date(latestWorkoutDate)
                ) {
                  latestWorkoutDate = workoutDate;
                }
              });
            }
          });

          if (latestWorkoutDate) {
            // Преобразуем строку в объект Date и форматируем в вид "DD.MM.YYYY HH:mm"
            const dateObj = new Date(latestWorkoutDate);
            const formattedDate = dateObj.toLocaleString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });

            setLastWorkoutDate(formattedDate);
          } else {
            setLastWorkoutDate("No workouts found");
          }
        } catch (error) {
          console.error("Error fetching workout data:", error);
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
});
