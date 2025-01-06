import { GetProp, MenuProps, ConfigProviderProps } from "antd";
import {
  CSSProperties,
  LegacyRef,
  MouseEventHandler,
  ReactNode,
  RefObject,
} from "react";

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

export type InsideLookType = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export interface IMenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
}

export type HeaderPropsType = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  language: string;
  handleLanguageClick: ({ key }: { key: string }) => void;
  languageItems: IMenuItem[];
  changeLanguage: (language: string) => void;
};

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

export interface IErrorModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export type LanguageDropdownPropsType = {
  handleLanguageClick: ({ key }: { key: string }) => void;
  languageItems: IMenuItem[];
  language: string | undefined;
  changeLanguage: (language: string) => void;
};

export interface IAboutCardProps {
  title: string;
  text: string;
  image: string;
}

export interface ICalendar {
  className?: string;
  onChange: (value: Date) => void;
  value?: Date | null;
  disabledDate?: any;
}

export type SizeType = ConfigProviderProps["componentSize"];

export interface ICustomButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  htmlType?: "button" | "submit" | "reset" | undefined;
  style?: CSSProperties | undefined;
}

export interface IDescriptionTitleAndText {
  text: string;
  textAlign: "start" | "center" | "end";
  className?: string;
}

export interface ICustomInputProps<T = string> {
  name?: string;
  text: string;
  placeholder: string;
  isRequired?: boolean;
  className?: string;
  onChange?: (value: T) => void;
  value?: T;
}

export type FieldType = {
  [key: string]: string | undefined;
  username: string;
  password: string;
};

export interface IHexagonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

export interface IPageWrapperProps {
  children: React.ReactNode;
}

export interface ICustomPasswrodInputProps {
  onChange: (value: string) => void;
}

export interface IPasswordInputProps {
  name: string;
  text: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export interface IResetButtonType {
  onClick: MouseEventHandler<HTMLElement> | undefined;
  children: string;
  icon: ReactNode;
}

export interface ISubTitleType {
  children: string;
  className?: string;
}

export type BurgerMenuItem = GetProp<MenuProps, "items">[number];

export interface IAuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface IAuthProviderProps {
  children: ReactNode;
}

export interface IUserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  age: number;
  gender: string;
  status: string;
  sport: string;
  height: string;
  weight: string;
  location: {
    country: string | undefined;
    city: string;
  };
}

export type AddExercisePropsType = {
  setFavoriteExercisesArray: React.Dispatch<React.SetStateAction<IExercise[]>>;
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

export interface ILocationState {
  title: string;
}

export interface IHexagonLinkProps {
  text: string;
}

export interface IAddExercise {
  category: string;
  onAddExercise: () => void;
  setData: (value: IExercise[]) => void;
}

export interface IProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export interface IExercisesProps {
  category: string;
  updateTrigger: number;
  onSelectExercise: (exercise: IExercise) => void;
  exercisesRef: RefObject<HTMLDivElement>;
  activeCardId: string | null;
  setActiveCardId: (value: string | null) => void;
  setSelectedExercise: (value: IExercise | null) => void;
  data: IExercise[];
  setData: (value: IExercise[]) => void;
}

export interface IBestResult {
  weight: string;
  reps: string;
}

export interface IExercise {
  id: string;
  category: string;
  name: string;
  bestResult: IBestResult;
  isFavorite: boolean;
}

export interface ICustomModalProps {
  open: boolean;
  onCancel: (e: { stopPropagation: () => void }) => void;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  isModalOpen?: boolean;
}

export interface IConfirmDeleteModal {
  text: string;
  onClick: (e: { stopPropagation: () => void }) => void;
  isModalOpen: boolean;
  handleCancel: (e: { stopPropagation: () => void }) => void;
}

export interface INumericInputProps {
  value: string | undefined;
  onChange: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  placeholder?: string;
}

export type ExerciseTablePropsType = {
  selectedExercise: IExercise | null;
  setSelectedExercise: (value: IExercise | null) => void;
  setActiveCardId: (value: string | null) => void;
};

export interface IApproach {
  key: number;
  reps: number;
  set: number;
  weight: number;
  icon: React.ReactNode;
  id: string;
}

export type ExerciseCardPropsType = {
  item: IExercise;
  onSelectExercise: (item: IExercise) => void;
  category: string;
  setData: (value: IExercise[]) => void;
  setLoading: (value: boolean) => void;
  activeCardId: string | null;
  setActiveCardId: (value: string | null) => void;
  index: number;
  exercisesRef: RefObject<HTMLDivElement>;
  setSelectedExercise: (value: IExercise | null) => void;
};

export type CardOptionsPropsType = {
  item: IExercise;
  category: string;
  setData: (value: IExercise[]) => void;
  setCurrentEditingId: (value: string | null) => void;
  setNewName: (value: string) => void;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
};

export type DeleteIconPropsType = {
  setLoading: (value: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
  category: string;
  setData: (value: IExercise[]) => void;
  isModalOpen: boolean;
  handleCancel: (e: { stopPropagation: () => void }) => void;
  item: IExercise;
  index: number;
  setSelectedExercise: (value: IExercise | null) => void;
};

export type ModalDeletePropsType = {
  setLoading: (value: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
  category: string;
  setData: (value: IExercise[]) => void;
  isModalOpen: boolean;
  handleCancel: (e: { stopPropagation: () => void }) => void;
  item: IExercise;
  setConfirm: (value: boolean) => void;
  setSelectedExercise: (value: IExercise | null) => void;
};

export type EditInputPropsType = {
  newName: string;
  editMode: boolean;
  currentEditingId: string | null;
  setCurrentEditingId: (value: string | null) => void;
  category: string;
  setData: (value: IExercise[]) => void;
  setEditMode: (value: boolean) => void;
  setNewName: (value: string) => void;
};

export type InputContainerPropsType = {
  reps: number;
  setReps: (reps: number) => void;
  setResult: (result: number) => void;
  weight: string;
  setWeight: (weight: string) => void;
};

export type ConfirmDeleteAccountPropsType = {
  confirm: boolean;
  setConfirm: (value: boolean) => void;
};

export interface ICountrySelectProps {
  country?: string;
  handleCountryChange: (value: string) => void;
  filterOptions: (value: string) => void;
  filteredCountries: { value: string; label: string }[];
  isRequired: boolean;
}

export interface IExerciseItemProps {
  item: IExercise;
}

export type TableFooterPropsType = {
  selectedExercise: IExercise | null;
  data: ExerciseTableType[];
  setData: (value: ExerciseTableType[]) => void;
  setEditWeight: (value: string | null) => void;
  saveExerciseData: () => void;
  onWorkoutDateChange: (date: string) => void;
  setCurrentWorkout: (currentWorkout: boolean) => void;
  addRowBtn: boolean;
  setAddRowBtn: (addRowBtn: boolean) => void;
  saveBtn: boolean;
  setSaveBtn: (saveBtn: boolean) => void;
  setDeleteBtn: (deleteBtn: boolean) => void;
  showHistory: boolean;
  setShowHistory: (showHistory: boolean) => void;
};

export type DeleteRowPropsType = {
  selectedExercise: IExercise | null;
  loadExerciseData: () => void;
  index: number;
};

export interface IBestResultProps {
  bestResult: {
    weight: string;
    reps: string;
  } | null;
  selectedExercise: IExercise | null;
  setBestResult: (value: IBestResult) => void;
}

export interface IDeleteWorkoutProps {
  workoutDate: string | null;
  selectedExercise: IExercise | null;
  setData: (value: ExerciseTableType[]) => void;
  setWorkoutDate: (workoutDate: string | null) => void;
  setSelectedExercise: (value: IExercise | null) => void;
  setActiveCardId: (value: string | null) => void;
}

export type ClosableMessagePropsType = {
  type: "error" | "warning" | "success" | "info";
  content: string;
};

export type TrainingHistoryPropsType = {
  showHistory: boolean;
  workouts: ExerciseTableType[][];
  workoutDates: string[];
};

export type SportSelectPropsType = {
  value: string;
  onChange: (value: string) => void;
};

export type UserInfoPropsType = {
  userData: IUserData | null;
};

export type ProfileAsidePropsType = {
  userData: IUserData | null;
};

export type PhysiquePropsType = {
  userData: IUserData | null;
};

export interface UserContextProps {
  userData: IUserData | null;
  updateUserData: (newData: Partial<IUserData>) => void;
}

export type EditPhysiquePropsType = {
  height: string | undefined;
  weight: string | undefined;
  initialHeight: string | undefined;
  initialWeight: string | undefined;
  setEditMode: (value: boolean) => void;
  setInitialHeight: (initialHeight: string | undefined) => void;
  setInitialWeight: (initialWeight: string | undefined) => void;
  setHeight: (height: string | undefined) => void;
  setWeight: (weight: string | undefined) => void;
};

export type DataTablePropsType = {
  data: ExerciseTableType[];
  setData: (value: ExerciseTableType[]) => void;
  currentWorkout: boolean;
  editWeight: string | null;
  weightInputRef: LegacyRef<HTMLInputElement> | undefined;
  setEditWeight: (editWeight: string | null) => void;
  editReps: string | null;
  repsInputRef: LegacyRef<HTMLInputElement> | undefined;
  setEditReps: (editReps: string | null) => void;
};

export interface IGoalData {
  id: string;
  goal: string;
  startWeight: string;
  startDate: string;
  goalWeight: string;
  endDate: string;
  currentValue: string;
}

export type EditGoalPropsType = {
  editMode: boolean;
  goal: string | undefined;
  setGoal: (value: string) => void;
  currentValue: string | undefined;
  setCurrentValue: (value: string) => void;
  startWeight: string | undefined;
  setStartWeight: (value: string) => void;
  startDate: string | undefined;
  setStartDate: (value: string) => void;
  goalWeight: string | undefined;
  setGoalWeight: (value: string) => void;
  endDate: string | undefined;
  setEndDate: (value: string) => void;
  setEditMode: (value: boolean) => void;
  goalData: IGoalData | undefined;
  setGoalData: (value: IGoalData | undefined) => void;
};

export type GoalInitialBlockPropsType = {
  setGoalData: (value: IGoalData | undefined) => void;
};

export type MainBlockPropsType = {
  goalData: IGoalData | undefined;
  setGoalData: (value: IGoalData | undefined) => void;
  setGoal: (value: string) => void;
  setCurrentValue: (value: string) => void;
  setStartWeight: (value: string) => void;
  setStartDate: (value: string) => void;
  setGoalWeight: (value: string) => void;
  setEndDate: (value: string) => void;
  setEditMode: (value: boolean) => void;
};

export type SettingButtonPropsType = {
  onClick?: MouseEventHandler<HTMLElement> | undefined;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};
