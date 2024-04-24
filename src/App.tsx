import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Onboardingroutes from "./pages/onboarding/onboarding-routes";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/onboarding/*" element={<Onboardingroutes />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
