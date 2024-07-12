import { Navigate } from "react-router-dom";

import { ProtectedRouteProps } from "../types/types";

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};
