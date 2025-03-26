import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { BrowserRouter } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Provider } from "react-redux";

import { App } from "./App";
import { store } from "./redux/store";

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
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
