import { v4 as uuidv4 } from "uuid";

import { IExercise } from "../../types/types";

const initialState: IExercise[] = [
  {
    bestResult: {
      weight: "0",
      reps: "0",
    },
    category: "Back",
    id: uuidv4(),
    isFavorite: false,
    name: "Pull-down to the chest",
  },
  {
    bestResult: {
      weight: "0",
      reps: "0",
    },
    category: "Legs",
    id: uuidv4(),
    isFavorite: false,
    name: "Barbell squats",
  },
  {
    bestResult: {
      weight: "0",
      reps: "0",
    },
    category: "Chest",
    id: uuidv4(),
    isFavorite: false,
    name: "Bench press",
  },
  {
    bestResult: {
      weight: "0",
      reps: "0",
    },
    category: "Hands",
    id: uuidv4(),
    isFavorite: false,
    name: "Bicep curls",
  },
  {
    bestResult: {
      weight: "0",
      reps: "0",
    },
    category: "Delts",
    id: uuidv4(),
    isFavorite: false,
    name: "Seated dumbbell press",
  },
];

export const exercisesReducer = (state: IExercise[] = initialState) => {
  return state;
};

export const actions = {};
