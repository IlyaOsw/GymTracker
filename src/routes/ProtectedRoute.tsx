import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IProtectedRouteProps } from "types/protected-route";
import { Loader } from "components/Loader/Loader";

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

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
