import React, { useMemo, useState } from "react";

import GetOtp from "../molecules/get-otp";
import VerifyAccount from "../molecules/verify-account";
import NewPassword from "../molecules/forms/create-new-password-form";

const ResetPassword: React.FC = () => {
  const [screenIndex, setScreenIndex] = useState(0);

  const screens = useMemo(
    () => [<GetOtp />, <VerifyAccount />, <NewPassword />],
    [screenIndex, setScreenIndex]
  );

  return <React.Fragment>{screens[screenIndex]}</React.Fragment>;
};

export default ResetPassword;
