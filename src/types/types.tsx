import { GetProp, MenuProps, ConfigProviderProps } from "antd";
import { ReactNode } from "react";

export enum SocialLinks {
  LINKEDIN = "Linkedin",
  FACEBOOK = "Facebook",
  INSTAGRAM = "Instagram",
  TELEGRAM = "Telegram",
}

export type SocialLinksType = {
  id: number;
  url: string;
  label: SocialLinks;
};

export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

export type HeaderPropsType = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  theme?: string;
  handleThemeClick?: ({ key }: { key: string }) => void;
  themeItems?: MenuItem[];
  language?: string;
  handleLanguageClick?: ({ key }: { key: string }) => void;
  languageItems?: MenuItem[];
  changeLanguage: (language: string) => void;
};

export interface ImageData {
  src: string;
  alt: string;
  text: string;
}

export type ExerciseTableType = {
  key: string;
  weight: number;
  set: number;
  reps: number;
  icon: React.ReactNode;
};

export type RegistrationType = {
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
};

export type PersonalInformationType = {
  onFirstNameChange: (firstName: string) => void;
  onLastNameChange: (lastName: string) => void;
  onGenderChange: (gender: string) => void;
  onDateOfBithChange: (dateOfBirth: string) => void;
};

export type AddressType = {
  onCountryChange: (country: string) => void;
  onCityChange: (city: string) => void;
};

export interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export type ThemeDropdownPropsType = {
  handleThemeClick?: ({ key }: { key: string }) => void;
  themeItems?: MenuItem[];
  theme: string | undefined;
};

export type LanguageDropdownPropsType = {
  handleLanguageClick?: ({ key }: { key: string }) => void;
  languageItems?: MenuItem[];
  language: string | undefined;
  changeLanguage: (language: string) => void;
};

export interface AboutCardProps {
  title: string;
  text: string;
  image: string;
}

export interface ICalendar {
  className?: string;
  onChange?: (value: string) => void;
}

export type SizeType = ConfigProviderProps["componentSize"];

export interface CustomButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  text?: string | any;
  textAlign?: "start" | "center" | "end";
}

export interface CustomInputProps {
  name?: string;
  text: string;
  type?: string;
  placeholder?: string;
  isRequired?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
}

export type FieldType = {
  [key: string]: string | undefined;
  username?: string;
  password?: string;
};

export interface HexagonProps {
  text: string;
  className?: string;
}

export interface PageWrapperProps {
  children: React.ReactNode;
}

export interface CustomPassInputProps {
  onChange?: (value: string) => void;
}

export interface PasswordInputProps {
  name?: string;
  text?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export interface ResetBtnType {
  onClick?: () => void;
  children?: string;
}

export interface SubTitleType {
  children: string;
  className?: string;
}

export type BurgerMenuItem = GetProp<MenuProps, "items">[number];

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface UserData {
  toJSON(): unknown;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  age: number;
  gender: string;
  location: {
    country: string;
    city: string;
  };
}

export type FavoriteExercisesType = {
  id: number;
  name: string;
  result: string;
};
