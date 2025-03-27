export type PersonalInformationType = {
  onFirstNameChange: (firstName: string) => void;
  onLastNameChange: (lastName: string) => void;
  onGenderChange: (gender: string) => void;
  onDateOfBirthChange: (dateOfBirth: Date | null) => void;
};
