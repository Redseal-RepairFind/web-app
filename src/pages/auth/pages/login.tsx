import React from "react";
import Container from "../../../components/global/container";
import Layout from "../../../components/global/layout";

import LoginBg from "../../../images/login.png";
// import logo from "../../../images/logo_white.png";

import LoginForm from "../molecules/forms/login-form";

const Login: React.FC = () => {
  return (
    <Layout>
      <Container className="flex items-center justify-center">
        <main className="flex w-full items-center justify-between py-4">
          <div className="hidden md:flex items-center justify-center flex-1 p-10">
            <img src={LoginBg} alt="Login Background" className="w-[60%]" />
          </div>
          <LoginForm />
        </main>
      </Container>
    </Layout>
  );
};

export default Login;
