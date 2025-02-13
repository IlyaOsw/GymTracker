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
