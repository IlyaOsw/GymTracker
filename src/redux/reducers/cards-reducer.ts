import { ICard } from "types/cards";

const initialState: ICard[] = [
  {
    id: 1,
    title: "cardTitle1",
    text: "cardText1",
    image: process.env.PUBLIC_URL + "/assets/Images/MainCards/Card1.jpg",
  },
  {
    id: 2,
    title: "cardTitle2",
    text: "cardText2",
    image: process.env.PUBLIC_URL + "/assets/Images/MainCards/Card2.jpg",
  },
  {
    id: 3,
    title: "cardTitle3",
    text: "cardText3",
    image: process.env.PUBLIC_URL + "/assets/Images/MainCards/Card3.jpg",
  },
  {
    id: 4,
    title: "cardTitle4",
    text: "cardText4",
    image: process.env.PUBLIC_URL + "/assets/Images/MainCards/Card4.jpg",
  },
];

export const cards = (state: ICard[] = initialState) => {
  return state;
};

export const actions = {};
