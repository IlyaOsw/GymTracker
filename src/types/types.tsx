export enum SocialLinks {
  LINKEDIN = "Linkedin",
  FACEBOOK = "Facebook",
  INSTAGRAM = "Instagram",
  TELEGRAM = "Telegram",
}

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
