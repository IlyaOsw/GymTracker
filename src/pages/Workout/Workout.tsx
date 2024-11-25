import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { IExercise, ILocationState } from "../../types/types";
import { scrollToTop } from "../../utils/scrollToTop";

import { Exercises } from "./Exercises/Exercises";
import { ExerciseTable } from "./ExerciseTable/ExerciseTable";
import { AddExercise } from "./AddExercise/AddExercise";

const Workout: React.FC = () => {
  const location = useLocation();
  const state = location.state as ILocationState;
  const [data, setData] = useState<IExercise[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState<IExercise | null>(
    null
  );
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const exercisesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleUpdateExercises = () => {
    setUpdateTrigger((prev) => prev + 1);

    if (exercisesRef.current) {
      exercisesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectExercise = (exercise: IExercise) => {
    const exerciseData = data.find((item) => item.id === exercise.id);

    if (exerciseData) {
      setSelectedExercise(exercise);
    } else {
      setSelectedExercise(null);
      setData([]);
    }
  };

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
          exercisesRef={exercisesRef}
          activeCardId={activeCardId}
          setActiveCardId={setActiveCardId}
          setSelectedExercise={setSelectedExercise}
          data={data}
          setData={setData}
        />
        <ExerciseTable
          selectedExercise={selectedExercise}
          setSelectedExercise={setSelectedExercise}
          setActiveCardId={setActiveCardId}
        />
      </div>
    </PageWrapper>
  );
};

export default Workout;
