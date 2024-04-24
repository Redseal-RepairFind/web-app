import React from "react";
import { Routes, Route } from "react-router-dom";
import SelectLanguage from "./screens/select-language";

function onboardingroutes() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<SelectLanguage />} />
      </Routes>
    </React.Fragment>
  );
}

export default onboardingroutes;
