import { IMenuItem } from "./menu-item";

export type LanguageDropdownPropsType = {
  handleLanguageClick: ({ key }: { key: string }) => void;
  languageState: IMenuItem[];
  language: string | undefined;
  changeLanguage: (language: string) => void;
};
