import React from "react";
import Layout from "../../../components/global/layout";
import Container from "../../../components/global/container";
import CreateAccount from "./molecules/create-account";

const company = () => {
  return (
    <Layout className={"bg-gray-100"}>
      <Container className="flex w-full items-center py-3 sm:min-h-[77.4vh] min-h-[64.2vh] justify-center">
        <CreateAccount />
      </Container>
    </Layout>
  );
};

export default company;
