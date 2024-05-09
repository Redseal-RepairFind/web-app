import React from "react";
import Layout from "../../../components/global/layout";
import Container from "../../../components/global/container";
import CreateAccount from "./molecules/create-account";

const employee = () => {
  return (
    <Layout className={"bg-gray-100"}>
      <Container className="flex w-full items-center py-3 justify-center">
        <CreateAccount />
      </Container>
    </Layout>
  );
};

export default employee;
