import React, { createContext, useContext, useState } from "react";

import { UserContextProps, IUserData } from "../types/types";

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<IUserData | null>(null);

  const updateUserData = (newData: Partial<IUserData>) => {
    setUserData((prev) =>
      prev ? { ...prev, ...newData } : (newData as IUserData)
    );
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
