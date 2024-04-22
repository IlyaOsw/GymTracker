import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { HashRouter } from "react-router-dom";

import App from "./App";

const firebaseConfig = {
  apiKey: "AIzaSyBg1LS3f644UZ6uYC6KTnakEaEJFTwPEhc",
  authDomain: "gym-tracker-ff553.firebaseapp.com",
  projectId: "gym-tracker-ff553",
  storageBucket: "gym-tracker-ff553.appspot.com",
  messagingSenderId: "549523110474",
  appId: "1:549523110474:web:1c334f5cb197c8f6c2c4b3",
  measurementId: "G-3QMWRZMT3Q",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
