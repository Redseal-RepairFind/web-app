import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/pages/login";
import Onboardingroutes from "./pages/onboarding/onboarding-routes";
import ResetPassword from "./pages/auth/pages/reset-password";
import { Toaster } from "react-hot-toast";
import { UserContext } from "./context/user-context";
import { ContextType } from "./types";

function App() {
  const [context, setContext] = useState<ContextType>({ languageChoice: "en" });

  return (
    <React.Fragment>
      <UserContext.Provider value={{ context, setContext }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/onboarding/*" element={<Onboardingroutes />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </UserContext.Provider>
      <Toaster
        toastOptions={{
          className: "text-sm",
          success: { iconTheme: { primary: "#000000", secondary: "white" } },
        }}
      />
    </React.Fragment>
  );
}

export default App;
