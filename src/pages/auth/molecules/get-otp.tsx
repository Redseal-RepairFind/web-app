import React from "react";
import Container from "../../../components/global/container";
import Layout from "../../../components/global/layout";

import ForgotPassword from "../../../images/forgot_password.png";
import logo from "../../../images/logo_white.png";

import GetOtpForm from "./get-otp-form";

const GetOtp: React.FC = () => {
  return (
    <Layout>
      <Container className="py-3">
        <img src={logo} alt="Logo" className="w-10 h-10" />
      </Container>
      <Container className="flex items-center sm:min-h-[80vh] justify-center">
        <main className="flex w-full items-center justify-between py-4">
          <div className="hidden md:flex items-center justify-end flex-1 p-10">
            <img
              src={ForgotPassword}
              alt="Login Background"
              className="w-[60%]"
            />
          </div>
          <GetOtpForm />
        </main>
      </Container>
    </Layout>
  );
};

export default GetOtp;
