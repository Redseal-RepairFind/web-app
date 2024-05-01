import React from "react";
import IndividualUpdate from "./individual-update-info";
import CompanyUpdateInformation from "./company-update-info";
import EmployeeUpdateInformation from "./employee-update-info";
import { useLocation } from "react-router-dom";

const UpdateInformation: React.FC = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const accountType = searchParams.get("accountType");

  if (accountType === "company") return <CompanyUpdateInformation />;

  if (accountType === "employee") return <EmployeeUpdateInformation />;

  return <IndividualUpdate />;
};

export default UpdateInformation;
