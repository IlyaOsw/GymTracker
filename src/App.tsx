import React from "react";

import { CustomLayout } from "./layout/Layout";
import { AuthProvider } from "./context/AuthContext";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CustomLayout />
    </AuthProvider>
  );
};
