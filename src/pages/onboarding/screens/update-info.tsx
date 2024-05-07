import React, { useEffect } from "react";
import IndividualUpdate from "./individual-update-info";
import CompanyUpdateInformation from "./company-update-info";
import EmployeeUpdateInformation from "./employee-update-info";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateInformation: React.FC = () => {
  const location = useLocation();

  const userString = sessionStorage.getItem("repairfind_user");
  const user = userString ? JSON.parse(userString) : null;

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/onboarding");
  }, []);

  const searchParams = new URLSearchParams(location.search);
  const accountType = searchParams.get("accountType");

  if (accountType === "company") return <CompanyUpdateInformation />;

  if (accountType === "employee") return <EmployeeUpdateInformation />;

  return <IndividualUpdate />;
};

export default UpdateInformation;
