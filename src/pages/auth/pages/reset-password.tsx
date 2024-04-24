import React, { useMemo, useState } from "react";

import GetOtp from "../molecules/get-otp";

const ResetPassword: React.FC = () => {
  const [currentScreenIndex, setScreenIndex] = useState(0);

  const screens = useMemo(() => [<GetOtp />], [currentScreenIndex]);

  return <React.Fragment>{screens[currentScreenIndex]}</React.Fragment>;
};

export default ResetPassword;
