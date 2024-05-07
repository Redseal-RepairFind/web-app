import React from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useLanguage from "../../../../hooks/useLanguage";
import useAuth from "../../../../hooks/useAuth";
import PasswordField from "../../../../components/form/password-field";

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const { handleLanguageChoice } = useLanguage();
  const { Login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (payload: any) => {
    toast.loading("Logging you in...");
    try {
      const data = await Login(payload);
      // console.log(data);
      toast.remove();
      toast.success(data?.message);
      sessionStorage.setItem("repairfind_user", JSON.stringify(data?.user));
      sessionStorage.setItem("userToken", data?.accessToken);
      // console.log(data?.user);
      const { user } = data;
      if (user?.onboarding?.stage?.status === 1) {
        toast.remove();
        toast.error("Kindly complete your onboarding process...");
        sessionStorage.setItem(
          `${user?.accountType?.toLowerCase()}_session_step`,
          `${user?.onboarding?.stage?.status - 1}`
        );
        navigate(
          `/onboarding/update-information?accountType=${user?.accountType.toLowerCase()}`
        );
      } else if (user?.onboarding?.stage?.status === 2) {
        toast.remove();
        toast.error("Kindly complete your onboarding process...");
        sessionStorage.setItem(
          `${user?.accountType?.toLowerCase()}_session_step`,
          `${user?.onboarding?.stage?.status - 1}`
        );
        navigate(
          `/onboarding/update-information?accountType=${user?.accountType.toLowerCase()}`
        );
      } else if (user?.onboarding?.stage?.status === 3) {
        toast.remove();
        toast.error("Kindly complete your onboarding process...");
        if (user?.accountType.toLowerCase() === "employee") {
          return navigate(`/quiz`);
        }
        sessionStorage.setItem(
          `${user?.accountType?.toLowerCase()}_session_step`,
          `${user?.onboarding?.stage?.status - 1}`
        );
        navigate(
          `/onboarding/update-information?accountType=${user?.accountType.toLowerCase()}`
        );
      } else if (user?.onboarding?.stage?.status === 4) {
        toast.remove();
        toast.error("Kindly complete your onboarding process...");
        if (user?.accountType.toLowerCase() === "individual") {
          return navigate(`/quiz`);
        }
        sessionStorage.setItem(
          `${user?.accountType?.toLowerCase()}_session_step`,
          `${user?.onboarding?.stage?.status - 1}`
        );
        navigate(
          `/onboarding/update-information?accountType=${user?.accountType.toLowerCase()}`
        );
      } else if (user?.onboarding?.stage?.status === 5) {
        toast.remove();
        toast.error("Kindly complete your onboarding process...");
        navigate(`/quiz`);
      } else {
        // console.log("done");
        setTimeout(() => {
          navigate(`/account`);
        }, 300);
      }
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
        onSubmit={handleSubmit(handleLogin)}
      >
        <h1 className="font-semibold text-2xl mb-5">
          {handleLanguageChoice("login")}
        </h1>
        <div className="mb-10">
          <label className="text-sm font-medium">
            {handleLanguageChoice("email")}
          </label>
          <input
            type="email"
            placeholder="Enter Email*"
            {...register("email", {
              required: true,
            })}
            className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
          />
        </div>
        <PasswordField
          title={handleLanguageChoice("password")}
          {...register("password", {
            required: true,
          })}
        />
        <Link to={"/reset-password"} className="text-xs font-semibold">
          {handleLanguageChoice("forgot_password")}
        </Link>
        <button
          disabled={isSubmitting}
          className="border border-black bg-black mt-5 py-3 rounded-md text-white"
        >
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
