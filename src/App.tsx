import React from "react";

import { CustomLayout } from "./layout/Layout";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CustomLayout />
    </AuthProvider>
  );
};

export default App;
