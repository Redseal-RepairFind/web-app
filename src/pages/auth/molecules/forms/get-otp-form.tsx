import React from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";

const GetOtpForm = ({ handleNext }: { handleNext: any }) => {
  const { handleSubmit, register } = useForm();

  const { GetOTP } = useAuth();
  const navigate = useNavigate();

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
        <h1 className="font-semibold text-2xl">Password Reset</h1>
        <span className=" mb-7 text-gray-500">
          Please enter your email associated with your RepairFind Account and we
          will send a link to reset your password.
        </span>
        <div className="mb-7">
          <label className="text-sm font-medium text-gray-500">Email</label>
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
          Continue
        </button>
        <span className="flex text-xs mt-1 items-center justify-center gap-1">
          <p className=" text-gray-400">Have an account?</p>
          <Link className="font-medium " to={"/"}>
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default GetOtpForm;
