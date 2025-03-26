import { IMenuItem } from "types/menu-item";

const initialState: IMenuItem[] = [
  {
    key: "1",
    label: "EN",
    icon: process.env.PUBLIC_URL + "/assets/Icons/Header/LanguageIcons/En.png",
  },
  {
    key: "2",
    label: "RU",
    icon: process.env.PUBLIC_URL + "/assets/Icons/Header/LanguageIcons/Ru.png",
  },
  {
    key: "3",
    label: "EE",
    icon: process.env.PUBLIC_URL + "/assets/Icons/Header/LanguageIcons/Ee.png",
  },
];

export const language = (state: IMenuItem[] = initialState) => {
  return state;
};

export const actions = {};
