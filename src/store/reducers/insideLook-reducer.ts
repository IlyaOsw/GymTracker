import { InsideLookType } from "../../types/store/inside-look";

const initialState: InsideLookType[] = [
  {
    id: 1,
    title: "inside1title",
    description: "inside1desc",
    image: process.env.PUBLIC_URL + "/assets/Images/InsideLook/Profile.png",
  },
  {
    id: 2,
    title: "inside2title",
    description: "inside2desc",
    image: process.env.PUBLIC_URL + "/assets/Images/InsideLook/DGC.png",
  },
  {
    id: 3,
    title: "inside3title",
    description: "inside3desc",
    image: process.env.PUBLIC_URL + "/assets/Images/InsideLook/Workout1.png",
  },
  {
    id: 4,
    title: "inside4title",
    description: "inside4desc",
    image: process.env.PUBLIC_URL + "/assets/Images/InsideLook/Workout2.png",
  },
];

export const insideLookReducer = (state: InsideLookType[] = initialState) => {
  return state;
};

export const actions = {};
