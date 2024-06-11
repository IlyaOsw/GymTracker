import React, { createContext, useContext, ReactNode } from "react";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

import { UpdateUserData, UserContextType } from "../types/types";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const updateUserData = async (userData: UpdateUserData) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        await setDoc(doc(db, "users", user.uid), userData, { merge: true });
      }
    } catch (error) {
      throw new Error("Failed to update user data");
    }
  };

  return (
    <UserContext.Provider value={{ updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};
