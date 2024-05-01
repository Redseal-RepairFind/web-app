import React from "react";
import { Routes, Route } from "react-router-dom";
import Account from "./account";

function accountroutes() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Account />} />
      </Routes>
    </React.Fragment>
  );
}

export default accountroutes;
