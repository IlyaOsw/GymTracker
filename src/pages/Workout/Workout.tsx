import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { LocationState } from "../../types/types";

import { ExerciseTable } from "./ExerciseTable/ExerciseTable";
import { AddExercise } from "./AddExercise/AddExercise";
import { Exercises } from "./Exercises/Exercises";

const Workout: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleUpdateExercises = () => {
    setUpdateTrigger((prev) => prev + 1);
  };

  return (
    <PageWrapper>
      <DescriptionTitle text={state?.title} textAlign="center" />
      <AddExercise
        category={state?.title}
        onAddExercise={handleUpdateExercises}
      />
      <Exercises category={state?.title} updateTrigger={updateTrigger} />
      <ExerciseTable />
    </PageWrapper>
  );
};

export default Workout;
