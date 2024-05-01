import React from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import useLanguage from "../../../../hooks/useLanguage";

const LoginForm = () => {
  const { handleSubmit, register } = useForm();

  const { handleLanguageChoice } = useLanguage();

  const handleLogin = () => {};
  return (
    <div className="flex-1 p-3">
      <form
        className="w-full flex flex-col mt-4 rounded-md p-8 bg-white"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h1 className="font-semibold text-2xl mb-5">
          {handleLanguageChoice("login")}
        </h1>
        <div className="mb-10">
          <label className="text-sm font-medium">
            {handleLanguageChoice("email")} /{" "}
            {handleLanguageChoice("phone_number")}
          </label>
          <input
            type="text"
            placeholder="Enter email or phone number*"
            className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
          />
        </div>
        <div className="mb-1">
          <label className="text-sm font-medium">
            {handleLanguageChoice("password")}
          </label>
          <input
            type="text"
            placeholder="Enter Password*"
            className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
          />
        </div>
        <Link to={"/reset-password"} className="text-xs font-semibold">
          {handleLanguageChoice("forgot_password")}
        </Link>
        <button className="border border-black bg-black mt-5 py-3 rounded-md text-white">
          {handleLanguageChoice("continue")}
        </button>
        <span className="flex text-xs mt-1 items-center justify-center gap-1">
          <p className=" text-gray-400">
            {handleLanguageChoice("dont_have_account")}
          </p>
          <Link className="font-medium " to={"/onboarding"}>
            {handleLanguageChoice("signup")}
          </Link>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
