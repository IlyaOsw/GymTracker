import { GetProp, MenuProps, ConfigProviderProps } from "antd";
import { ReactNode, RefObject } from "react";

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
  onDateOfBithChange: (dateOfBirth: Date | null) => void;
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
  onClick?: (e: any) => void;
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
  dateOfBirth: Date | null;
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

export interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export interface ExercisesProps {
  category: string;
  updateTrigger: number;
  onSelectExercise: (exercise: Exercise) => void;
  exercisesRef: RefObject<HTMLDivElement>;
}

export interface BestResult {
  weight: string;
  reps: string;
}

export interface Exercise {
  id: string;
  category: string;
  name: string;
  bestResult: BestResult;
  isFavorite: boolean;
}

export type CloseIconType = {
  onClick?: () => void;
};

export interface CustomModalProps {
  open?: boolean;
  onCancel?: (e: any) => void;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export interface NumericInputProps {
  value: string | undefined;
  onChange: (value: string) => void;
  onBlur?: () => void;
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
  activeCardId: string | null;
  setActiveCardId: (value: string | null) => void;
  index: number;
  exercisesRef: RefObject<HTMLDivElement>;
};

export type CardOptionsPropsType = {
  item: Exercise;
  category: string;
  setData: (value: Exercise[]) => void;
  setCurrentEditingId: (value: string | null) => void;
  setNewName: (value: string) => void;
  setEditMode: (value: boolean) => void;
};

export type DeleteIconPropsType = {
  setLoading: (value: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
  category: string;
  setData: (value: Exercise[]) => void;
  isModalOpen: boolean;
  handleCancel: (e: any) => void;
  item: Exercise;
  index: number;
};

export type ModalDeletePropsType = {
  setLoading: (value: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
  category: string;
  setData: (value: Exercise[]) => void;
  isModalOpen: boolean;
  handleCancel: (e: any) => void;
  item: Exercise;
  setConfirm: (value: boolean) => void;
};

export type EditInputPropsType = {
  newName: string;
  editMode: boolean;
  currentEditingId: string | null;
  setCurrentEditingId: (value: string | null) => void;
  category: string;
  setData: (value: Exercise[]) => void;
  setEditMode: (value: boolean) => void;
  setNewName: (value: string) => void;
};

export type InputContainerPropsType = {
  inputValue: string;
  reps: number;
  setReps: (reps: number) => void;
  setResult: (result: number) => void;
  setInputValue: (inputValue: string) => void;
  weight: number;
  setWeight: (weight: number) => void;
};

export type ConfirmDeleteAccountPropsType = {
  confirm: boolean;
  setConfirm: (value: boolean) => void;
};

export interface CountrySelectProps {
  country?: string | undefined;
  handleCountryChange: (value: string) => void;
  filterOptions: (value: string) => void;
  filteredCountries: { value: string; label: string }[];
}

export interface ExerciseItemProps {
  item: Exercise;
}

export type TableFooterPropsType = {
  selectedExercise: Exercise | null;
  data: ExerciseTableType[];
  setData: (value: ExerciseTableType[]) => void;
  setEditWeight: (value: string | null) => void;
  saveExerciseData: () => void;
  onWorkoutDateChange: any;
  setCurrentWorkout: (currentWorkout: boolean) => void;
  addRowBtn: boolean;
  setAddRowBtn: (addRowBtn: boolean) => void;
  saveBtn: boolean;
  setSaveBtn: (saveBtn: boolean) => void;
  setDeleteBtn: (deleteBtn: boolean) => void;
};

export type DeleteRowPropsType = {
  selectedExercise: Exercise | null;
  loadExerciseData: () => void;
  index: number;
};

export interface BestResultProps {
  bestResult: {
    weight: string;
    reps: string;
  } | null;
  selectedExercise: Exercise | null;
  setBestResult: (value: BestResult) => void;
}

export interface DeleteWorkoutProps {
  workoutDate: string | null;
  selectedExercise: Exercise | null;
  setData: (value: ExerciseTableType[]) => void;
  setWorkoutDate: (workoutDate: string | null) => void;
}
