import React from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { handleSubmit, register } = useForm();

  const handleLogin = () => {};
  return (
    <div className="flex-1 p-3">
      <form
        className="w-full flex flex-col mt-4 rounded-md p-8 bg-white"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h1 className="font-semibold text-2xl mb-5">Login</h1>
        <div className="mb-10">
          <label className="text-sm font-medium">Email / Phone number</label>
          <input
            type="text"
            placeholder="Enter email or phone number*"
            className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
          />
        </div>
        <div className="mb-1">
          <label className="text-sm font-medium">Password</label>
          <input
            type="text"
            placeholder="Enter Password*"
            className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
          />
        </div>
        <Link to={"/reset-password"} className="text-xs font-semibold">
          Forgot Password?
        </Link>
        <button className="border border-black bg-black mt-5 py-3 rounded-md text-white">
          Continue
        </button>
        <span className="flex text-xs mt-1 items-center justify-center gap-1">
          <p className=" text-gray-400">Don't have an account?</p>
          <Link className="font-medium " to={"/onboarding"}>
            Sign up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
