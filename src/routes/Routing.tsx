import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { Loader } from "../components/Loader/Loader";

const Main = React.lazy(() => import("../pages/Main/Main"));
const SignIn = React.lazy(() => import("../pages/SignIn/SignIn"));
const SignUp = React.lazy(() => import("../pages/SignUp/SignUp"));
const Profile = React.lazy(() => import("../pages/Profile/Profile"));
const Workout = React.lazy(() => import("../pages/Workout/Workout"));

export const Routing: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workout" element={<Workout />} />
      </Routes>
    </Suspense>
  );
};
