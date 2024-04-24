import React, { useMemo, useState } from "react";

import GetOtp from "../molecules/get-otp";
import VerifyAccount from "../molecules/verify-account";
import NewPassword from "../molecules/forms/create-new-password-form";

const ResetPassword: React.FC = () => {
  const [currentScreenIndex, setScreenIndex] = useState(2);

  const screens = useMemo(
    () => [<GetOtp />, <VerifyAccount />, <NewPassword />],
    [currentScreenIndex]
  );

  return <React.Fragment>{screens[currentScreenIndex]}</React.Fragment>;
};

export default ResetPassword;
