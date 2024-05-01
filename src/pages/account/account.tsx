import React from "react";
import Layout from "../../components/global/layout";
import Container from "../../components/global/container";
import Sidebar from "./molecules/sidebar";

const Account = () => {
  const userString = sessionStorage.getItem("repairfind_user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <Layout className={"bg-gray-100"}>
      <Container className="flex w-full items-start py-3 bg-white sm:min-h-[77.4vh] min-h-[64.2vh] justify-center">
        <div className="w-full p-5 flex">
          <Sidebar />
          <div className="flex-[4] flex items-center justify-center flex-col">
            <h1 className="text-2xl font-medium">Welcome, {user?.name}</h1>
            <button className="border border-black bg-black mt-5 py-3 px-10 rounded-md text-white">
              Upgrade your Profile?
            </button>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Account;
