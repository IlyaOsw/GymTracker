import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { ProtectedRouteProps } from "../types/types";
import { Loader } from "../components/Loader/Loader";

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};