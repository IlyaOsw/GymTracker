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
  weight: string;
  set: number;
  reps: string;
  icon: JSX.Element;
};

export type RegistrationType = {
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onImageChange: (file: File) => void;
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
  onChange?: (value: Date) => void;
  value?: Date | null;
}

export type SizeType = ConfigProviderProps["componentSize"];

export interface CustomButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  onClick?: (e: any) => void;
  text?: string | any;
  textAlign?: "start" | "center" | "end";
  htmlType?: "button" | "submit" | "reset";
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
  onClick?: () => void;
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
  icon?: ReactNode;
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

export type AddExercisePropsType = {
  setFavoriteExercisesArray: React.Dispatch<React.SetStateAction<Exercise[]>>;
  setShowAddModal: (value: boolean) => void;
  showAddModal: boolean;
};

export type EditProfilePropsType = {
  onClose: () => void;
};

export type EditFormPropsType = {
  onClose: () => void;
  setIsModalOpen: (value: boolean) => void;
};

export interface UpdateUserData {
  firstName: string;
  lastName: string;
  location: {
    country: string | undefined;
    city: string;
  };
  dateOfBirth: Date;
  age: number;
}

export interface UserContextType {
  updateUserData: (userData: UpdateUserData) => Promise<void>;
}

export interface LocationState {
  title: string;
}

export interface HexagonLinkProps {
  text: string;
}

export interface IAddExercise {
  category: string;
  onAddExercise: () => void;
}

export interface ExercisesProps {
  category: string;
  updateTrigger: number;
  onSelectExercise: (exercise: any) => void;
}

export interface Exercise {
  id: string;
  category: string;
  name: string;
  bestResult: number;
  isFavorite: boolean;
}

export type CloseIconType = {
  onClick?: () => void;
};

export interface CustomModalProps {
  open?: boolean;
  onCancel?: () => void;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export interface NumericInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export type ExerciseTablePropsType = {
  selectedExercise: Exercise | null;
};

export interface Approach {
  key: string;
  reps: number;
  weight: number;
}

export type ExerciseCardPropsType = {
  item: Exercise;
  onSelectExercise: (item: Exercise) => void;
  category: string;
  setData: (value: Exercise[]) => void;
  setLoading: (value: boolean) => void;
};

export type CardOptionsPropsType = {
  item: Exercise;
  category: string;
  setData: (value: Exercise[]) => void;
  setCurrentEditingId: (value: string) => void;
  setNewName: (value: string) => void;
  setEditMode: (value: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
};

export type DeleteIconPropsType = {
  setLoading: (value: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
  category: string;
  setData: (value: Exercise[]) => void;
  isModalOpen: boolean;
  handleCancel: () => void;
  item: Exercise;
};
