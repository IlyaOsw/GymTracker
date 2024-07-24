import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { Exercise, LocationState } from "../../types/types";

import { ExerciseTable } from "./ExerciseTable/ExerciseTable";
import { AddExercise } from "./AddExercise/AddExercise";
import { Exercises } from "./Exercises/Exercises";

const Workout: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleUpdateExercises = () => setUpdateTrigger((prev) => prev + 1);

  const handleSelectExercise = (exercise: Exercise) =>
    setSelectedExercise(exercise);

  return (
    <PageWrapper>
      <div style={{ minHeight: "100vh" }}>
        <DescriptionTitle text={state.title} textAlign="center" />
        <AddExercise
          category={state?.title}
          onAddExercise={handleUpdateExercises}
        />
        <Exercises
          category={state?.title}
          updateTrigger={updateTrigger}
          onSelectExercise={handleSelectExercise}
        />
        <ExerciseTable selectedExercise={selectedExercise} />
      </div>
    </PageWrapper>
  );
};

export default Workout;
