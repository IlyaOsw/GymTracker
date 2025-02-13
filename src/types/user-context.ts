import { IUserData } from "./user-data";

export interface UserContextProps {
  userData: IUserData | null;
  updateUserData: (newData: Partial<IUserData>) => void;
}
