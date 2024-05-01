import React from "react";
import Layout from "../../components/global/layout";
import Container from "../../components/global/container";
import Sidebar from "./molecules/sidebar";

const Account = () => {
  return (
    <Layout>
      <Container className="flex w-full items-start py-3 sm:min-h-[77.4vh] min-h-[64.2vh] justify-center">
        <div className="border border-red-500 w-full p-5 flex">
          <Sidebar />
          <div className="border border-blue-500 flex-[4]"></div>
        </div>
      </Container>
    </Layout>
  );
};

export default Account;
