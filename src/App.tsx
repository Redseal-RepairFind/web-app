import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/pages/login";
import Onboardingroutes from "./pages/onboarding/onboarding-routes";
import ResetPassword from "./pages/auth/pages/reset-password";
import { Toaster } from "react-hot-toast";
import { UserContext } from "./context/user-context";
import { ContextType } from "./types";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const [context, setContext] = useState<ContextType>({ languageChoice: "en" });

  const queryClient = new QueryClient();

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ context, setContext }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/onboarding/*" element={<Onboardingroutes />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </UserContext.Provider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
      </QueryClientProvider>
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
