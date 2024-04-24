import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/pages/login";
import Onboardingroutes from "./pages/onboarding/onboarding-routes";
import ResetPassword from "./pages/auth/pages/reset-password";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/onboarding/*" element={<Onboardingroutes />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
