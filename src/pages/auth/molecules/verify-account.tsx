import React from "react";
import Container from "../../../components/global/container";
import Layout from "../../../components/global/layout";

import ForgotPassword from "../../../images/forgot_password.png";
import logo from "../../../images/logo_white.png";

import VerifyAccountForm from "./forms/verify-account-form";

const VerifyAccount = ({
  handleNext,
  handlePrev,
}: {
  handleNext: any;
  handlePrev: any;
}) => {
  return (
    <Layout>
      <Container className="flex items-center justify-center">
        <main className="flex w-full items-center justify-between py-4">
          <div className="hidden md:flex items-center justify-end flex-1 p-10">
            <img
              src={ForgotPassword}
              alt="Login Background"
              className="w-[60%]"
            />
          </div>
          <VerifyAccountForm handleNext={handleNext} />
        </main>
      </Container>
    </Layout>
  );
};

export default VerifyAccount;
