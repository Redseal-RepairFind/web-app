import React from "react";
import { Routes, Route } from "react-router-dom";
import SelectLanguage from "./screens/select-language";
import SelectAccountType from "./screens/select-account-type";

function onboardingroutes() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<SelectLanguage />} />
        <Route path="/select-account-type" element={<SelectAccountType />} />
      </Routes>
    </React.Fragment>
  );
}

export default onboardingroutes;
