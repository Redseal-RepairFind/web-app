import React, { useEffect, useMemo, useState } from "react";

import GetOtp from "../molecules/get-otp";
import VerifyAccount from "../molecules/verify-account";
import NewPassword from "../molecules/forms/create-new-password-form";
import { useLocation } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const [screenIndex, setScreenIndex] = useState(0);

  const location = useLocation();

  const handleNextStep = () => {
    setScreenIndex(screenIndex + 1);
  };

  const handlePrevStep = () => {
    setScreenIndex(screenIndex - 1);
  };

  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const otp = searchParams.get("otp");

  useEffect(() => {
    if (otp && email) {
      setScreenIndex(2);
    } else if (email) {
      setScreenIndex(1);
    }
  }, [email, otp]);

  const screens = useMemo(
    () => [
      <GetOtp handleNext={handleNextStep} />,
      <VerifyAccount handleNext={handleNextStep} handlePrev={handlePrevStep} />,
      <NewPassword handlePrev={handlePrevStep} />,
    ],
    [screenIndex, setScreenIndex]
  );

  return <React.Fragment>{screens[screenIndex]}</React.Fragment>;
};

export default ResetPassword;
