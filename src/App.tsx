import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/auth/pages/login";
import Onboardingroutes from "./pages/onboarding/onboarding-routes";
import Accountroutes from "./pages/account/account-routes";
import ResetPassword from "./pages/auth/pages/reset-password";
import Quiz from "./pages/quiz/quiz";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "./context/user-context";
import { ContextType } from "./types";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BarLoader } from "react-spinners";
import error from "./images/denied.png";

// @ts-ignore
window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  const [context, setContext] = useState<ContextType>({ languageChoice: "en" });

  const location = useLocation();

  // console.log(location.pathname);

  const [isCanada, setIsCanada] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const [locationIsEnabled, setLocationIsEnabled] = useState<boolean>(false);

  const queryClient = new QueryClient();

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationIsEnabled(true);
          const { latitude, longitude } = position.coords;
          // Call a function to check if the user is in Canada
          checkLocationInCanada(latitude, longitude);
        },
        (error) => {
          setLocationIsEnabled(false);
          setIsFetching(false);
          toast.error("Error getting user location:");
          console.log(error);
        }
      );
    } else {
      setLocationIsEnabled(false);
      setIsFetching(false);
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // console.log(isCanada);

  const checkLocationInCanada = async (latitude: any, longitude: any) => {
    // Call a reverse geocoding API to get the user's country
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    const data = await response.json();
    const userCountry = data.countryCode;

    // Check if the user is in Canada (country code 'CA')

    if (userCountry === "CA") {
      setIsCanada(true);
    } else {
      setIsCanada(false);
    }
    setIsFetching(false);
  };

  // console.log

  if (isFetching && location.pathname.includes("onboarding")) {
    return (
      <div className="w-full h-[100vh] flex items-center p-5 justify-center">
        <BarLoader color="black" />
      </div>
    );
  }

  if (!locationIsEnabled && location.pathname.includes("onboarding")) {
    return (
      <div className="w-full h-[100vh] flex items-center gap-10 p-5 justify-center">
        <img src={error} className="w-[25%]" alt="Error" />
        <p className="text-cente font-semibold md:w-[50%] w-full">
          Oops, You have to enable location to sign up on our app...
        </p>
      </div>
    );
  }

  if (!isCanada && location.pathname.includes("onboarding")) {
    return (
      <div className="w-full h-[100vh] flex items-center flex-col gap-10 p-5 justify-center">
        <img src={error} className="w-[25%]" alt="Error" />
        <p className="text-center font-medium md:w-[50%] w-full">
          Oops, You cannot sign up on our app at this time in your current
          location, please be rest assured that we are scaling and you will be
          notified when your region is available for sign up...
        </p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ context, setContext }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/onboarding/*" element={<Onboardingroutes />} />
            <Route path="/account/*" element={<Accountroutes />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/quiz" element={<Quiz />} />
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
