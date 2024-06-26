import React from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import useLanguage from "../../../../hooks/useLanguage";

const GetOtpForm = ({ handleNext }: { handleNext: any }) => {
  const { handleSubmit, register } = useForm();

  const { GetOTP } = useAuth();
  const navigate = useNavigate();

  const { handleLanguageChoice } = useLanguage();

  const onSubmit = async (payload: any) => {
    toast.loading("Processing...");
    try {
      const data = await GetOTP(payload);
      toast.remove();
      toast.success(data?.message);
      setTimeout(() => {
        navigate(`/reset-password?email=${payload.email}`);
        handleNext();
      }, 1000);
    } catch (e: any) {
      console.log({ e });
      toast.remove();
      toast.error(e?.response?.data?.message);
    }
  };
  return (
    <div className="flex-1 p-3">
      <form
        className="w-full flex flex-col mt-4 rounded-md p-8 bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-semibold text-2xl">
          {handleLanguageChoice("password_reset")}
        </h1>
        <span className=" mb-7 text-gray-500">
          {handleLanguageChoice("reset_instruction")}
        </span>
        <div className="mb-7">
          <label className="text-sm font-medium text-gray-500">
            {handleLanguageChoice("email")}
          </label>
          <input
            type="email"
            {...register("email", {
              required: true,
            })}
            placeholder="Enter email*"
            className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-200 bg-slate-200 focus:bg-transparent outline-none focus:ring-0"
          />
        </div>
        <button className="border border-black bg-black mt-5 py-3 rounded-md text-white">
          {handleLanguageChoice("continue")}
        </button>
        <span className="flex text-xs mt-1 items-center justify-center gap-1">
          <p className=" text-gray-400">
            {handleLanguageChoice("have_account")}
          </p>
          <Link className="font-medium " to={"/"}>
            {handleLanguageChoice("login")}
          </Link>
        </span>
      </form>
    </div>
  );
};

export default GetOtpForm;
