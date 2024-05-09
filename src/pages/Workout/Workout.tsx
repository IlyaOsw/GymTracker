import React, { useEffect } from "react";

import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";

import { ExerciseTable } from "./ExerciseTable/ExerciseTable";
import { AddExercise } from "./AddExercise/AddExercise";
import { RecentlyUsed } from "./RecentlyUsed/RecentlyUsed";

const Workout: React.FC = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <PageWrapper>
      <DescriptionTitle text="Chest workout" textAlign="center" />
      <AddExercise />
      <RecentlyUsed />
      <ExerciseTable />
    </PageWrapper>
  );
};

export default Workout;
