import React from "react";
import { Routes, Route } from "react-router-dom";
import SelectLanguage from "./screens/select-language";
import SelectAccountType from "./screens/select-account-type";
import Individual from "./screens/individual";
import Company from "./screens/company";
import Employee from "./screens/employee";
import SubmitOtp from "./screens/molecules/submit-otp";
import UpdateInformation from "./screens/update-info";

function onboardingroutes() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<SelectLanguage />} />
        <Route path="/select-account-type" element={<SelectAccountType />} />
        <Route path="/individual" element={<Individual />} />
        <Route path="/company" element={<Company />} />
        <Route path="/Employee" element={<Employee />} />
        <Route path="/submit-otp" element={<SubmitOtp />} />
        <Route path="/update-information" element={<UpdateInformation />} />
      </Routes>
    </React.Fragment>
  );
}

export default onboardingroutes;
