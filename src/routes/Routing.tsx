import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Loader } from "../components/Loader/Loader";
import { useAuth } from "../context/AuthContext";

import { ProtectedRoute } from "./ProtectedRoute";

const Main = React.lazy(() => import("../pages/Main/Main"));
const ContactUs = React.lazy(() => import("../pages/ContactUs/ContactUs"));
const SignIn = React.lazy(() => import("../pages/SignIn/SignIn"));
const ResetPassword = React.lazy(
  () => import("../pages/ResetPassword/ResetPassword")
);
const SignUp = React.lazy(() => import("../pages/SignUp/SignUp"));

const RegistrationSuccess = React.lazy(
  () => import("../pages/RegistrationSuccess/RegistrationSuccess")
);
const Profile = React.lazy(() => import("../pages/Profile/Profile"));
const Workout = React.lazy(() => import("../pages/Workout/Workout"));
const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const NotAuthorized = React.lazy(
  () => import("../pages/NotAuthorized/NotAuthorized")
);

export const Routing: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/registrationsuccess" element={<RegistrationSuccess />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/workout"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Workout />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/403" element={<NotAuthorized />} />
      </Routes>
    </Suspense>
  );
};
