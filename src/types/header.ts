import { IMenuItem } from "./menu-item";

export type HeaderPropsType = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  language: string;
  handleLanguageClick: ({ key }: { key: string }) => void;
  languageItems: IMenuItem[];
  changeLanguage: (language: string) => void;
};
