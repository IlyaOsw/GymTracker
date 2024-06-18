import React, { useEffect } from "react";
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

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <PageWrapper>
      <DescriptionTitle text={state?.title} textAlign="center" />
      <AddExercise />
      <Exercises category={state?.title} />
      <ExerciseTable />
    </PageWrapper>
  );
};

export default Workout;
