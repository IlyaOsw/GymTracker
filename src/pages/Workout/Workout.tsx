import React, { useEffect, useRef, useState } from "react";
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
  const [data, setData] = useState<Exercise[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const exercisesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleUpdateExercises = () => {
    setUpdateTrigger((prev) => prev + 1);

    if (exercisesRef.current) {
      exercisesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectExercise = (exercise: Exercise) => {
    // Проверка наличия данных для выбранного упражнения
    const exerciseData = data.find((item) => item.id === exercise.id);

    if (exerciseData) {
      setSelectedExercise(exercise); // Устанавливаем выбранное упражнение
    } else {
      // Сбрасываем состояние и данные при отсутствии информации
      setSelectedExercise(null);
      setData([]); // Очищаем данные, если для упражнения нет записей
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
