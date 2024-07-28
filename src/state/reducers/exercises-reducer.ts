import { v4 as uuidv4 } from "uuid";

import { Exercise } from "../../types/types";

const initialState: Exercise[] = [
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
    category: "Shoulders",
    id: uuidv4(),
    isFavorite: false,
    name: "Seated dumbbell press",
  },
];

export const exercisesReducer = (state: Exercise[] = initialState) => {
  return state;
};

export const actions = {};
