import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";

const VerifyAccountForm = () => {
  const [otp, setOtp] = useState("");
  const { handleSubmit, register } = useForm();

  const handleLogin = () => {};
  return (
    <div className="flex-1 p-3">
      <form
        className="w-full flex flex-col mt-4 rounded-md p-8 bg-white"
        onSubmit={handleSubmit(handleLogin)}
      >
        <span className="font-semibold mb-5">Password Reset</span>
        <p className="font-semibold text-2xl mb-1">Account Verification</p>
        <span className=" mb-7 text-gray-500 font-medium">
          We sent a verification code to xyz@gmail.com.
          <br /> Please enter it below.
        </span>
        <span className=" text-gray-500 text-xs mb-1 font-medium">
          Code expires in 5 minutes
        </span>
        <div className="mb-2">
          <OtpInput
            value={otp}
            onChange={setOtp}
            containerStyle={"flex items-center justify-between mt-2 gap-1"}
            inputStyle={
              "border border-gray-200 flex-1 h-20 bg-gray-200 outline-none focus:ring-o focus:border-black rounded-md"
            }
            numInputs={4}
            renderSeparator={""}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <span className="mb-7 text-gray-500 text-xs font-medium flex gap-1 items-center">
          Didn't receive a code (0:05)?{" "}
          <p className="text-black">Click to resend</p>
        </span>

        <button className="border border-black bg-black mt-5 py-3 rounded-md text-white">
          Verify Account
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

export default VerifyAccountForm;
