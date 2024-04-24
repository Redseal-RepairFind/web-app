import React from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Container from "../../../../components/global/container";
import Layout from "../../../../components/global/layout";

const NewPassword = () => {
  const { handleSubmit, register } = useForm();

  const handleLogin = () => {};
  return (
    <Layout>
      <Container className="flex items-center sm:min-h-[77.4vh] min-h-[64.2vh] justify-center">
        <div className="flex-1 p-3">
          <form
            className="w-full flex flex-col max-w-2xl mx-auto mt-4 rounded-md p-8 bg-white"
            onSubmit={handleSubmit(handleLogin)}
          >
            <h1 className="font-semibold text-2xl mb-2">Create New Password</h1>
            <span className=" mb-7 text-gray-500">
              Enter the new password you will like to use when logging in to
              your account
            </span>
            <div className="mb-10">
              <label className="text-sm font-medium">New Password</label>
              <input
                type="text"
                placeholder="Enter password*"
                className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
              />
            </div>
            <div className="mb-1">
              <label className="text-sm font-medium">Re-enter Password</label>
              <input
                type="text"
                placeholder="Confirm password*"
                className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
              />
            </div>
            <button className="border mt-7 border-black bg-black py-3 rounded-md text-white">
              Continue
            </button>
          </form>
        </div>
      </Container>
    </Layout>
  );
};

export default NewPassword;
