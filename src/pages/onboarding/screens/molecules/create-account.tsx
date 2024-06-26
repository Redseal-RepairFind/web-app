import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import PasswordField from "../../../../components/form/password-field";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input/react-hook-form";
import useLanguage from "../../../../hooks/useLanguage";
import useAuth from "../../../../hooks/useAuth";

import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

const CreateAccount = () => {
  const { handleLanguageChoice } = useLanguage();

  const { handleCreate } = useAuth();
  const location = useLocation();

  useEffect(() => {
    sessionStorage.removeItem("employee_session_step");
    sessionStorage.removeItem("individual_session_step");
    sessionStorage.removeItem("company_session_step");
  }, []);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  // const handleLogin = (values: any) => {
  //   console.log(values);
  // };

  return (
    <div className="flex-1 p-3 max-w-[750px] mx-auto bg-white">
      <form
        className="w-full flex flex-col mt-4 rounded-md p-8 bg-white"
        onSubmit={handleSubmit(handleCreate)}
      >
        <h1 className="font-semibold text-2xl text-center mb-5">
          Create an Account
        </h1>
        {location.pathname.includes("company") && (
          <div className="w-full mb-10 flex-1">
            <label className="text-sm font-medium">
              {handleLanguageChoice("companyname")}
            </label>
            <input
              type="text"
              {...register("companyName", {
                required: true,
              })}
              className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
            />
          </div>
        )}
        {!location.pathname.includes("company") && (
          <div className="flex items-center sm:flex-row flex-col gap-2 justify-between">
            <div className="w-full mb-10 flex-1">
              <label className="text-sm font-medium">
                {handleLanguageChoice("firstname")}
              </label>
              <input
                type="text"
                {...register("firstName", {
                  required: true,
                })}
                className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
              />
            </div>
            <div className="w-full mb-10 flex-1">
              <label className="text-sm font-medium">
                {handleLanguageChoice("lastname")}
              </label>
              <input
                type="text"
                {...register("lastName", {
                  required: true,
                })}
                className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
              />
            </div>
          </div>
        )}
        <div className="flex items-center sm:flex-row flex-col gap-2 justify-between">
          <div className="w-full mb-10 flex-1">
            <label className="text-sm font-medium">
              {handleLanguageChoice("email")}
            </label>
            <input
              type="text"
              placeholder="xyz@abc.com*"
              {...register("email", {
                required: true,
              })}
              className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
            />
          </div>
          {!location.pathname.includes("company") && (
            <div className="w-full mb-10 flex-1">
              <label className="text-sm font-medium">
                {handleLanguageChoice("dob")}
              </label>
              <input
                type="date"
                {...register("dateOfBirth", {
                  required: true,
                })}
                className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
              />
            </div>
          )}
        </div>
        <div className="w-full">
          <label className="text-sm font-medium">
            {handleLanguageChoice("phone_number")}
          </label>
          <PhoneInput
            name="phoneNumber"
            countryCallingCodeEditable={false}
            international
            defaultCountry="CA"
            className="mt-1 px-3 mb-10 py-3 rounded-md focus:ring-0 focus:border-black outline-none border border-slate-300"
            control={control}
            rules={{ required: true }}
          />
          {errors.phoneNumber && (
            <div className="text-red-500 text-xs font-medium w-full text-center">
              {handleLanguageChoice("phone_error")}
            </div>
          )}
        </div>
        <div className="flex items-center sm:flex-row flex-col gap-2 justify-between">
          <PasswordField
            {...register("password", {
              required: true,
            })}
            title={handleLanguageChoice("password")}
          />
          <PasswordField
            {...register("passwordConfirmation", {
              required: true,
            })}
            title={handleLanguageChoice("confirm_password")}
          />
        </div>
        <div className="flex my-4 items-center sm:flex-row flex-col gap-2 justify-between">
          <label
            className={`w-full flex items-center gap-1 py-2 ${
              errors.acceptTerms ? "border-red-500" : "border-transparent"
            } border-b border-t text-[12px] px-1 duration-200 cursor-pointer
      `}
          >
            <input
              {...register("acceptTerms", {
                required: true,
              })}
              type="checkbox"
              className="accent-black"
            />{" "}
            <span className="flex gap-1 items-start justify-start flex-wrap text-wrap">
              <p>
                {handleLanguageChoice("term_first")}{" "}
                <a
                  className="text-blue-500 text-wrap hover:underline"
                  href="https://repairfind.ca/terms-of-service/"
                >
                  {handleLanguageChoice("term")}
                </a>{" "}
                {handleLanguageChoice("term_last")}{" "}
                <a
                  className="text-blue-500 text-wrap hover:underline"
                  href="https://repairfind.ca/privacy-policy/"
                >
                  {handleLanguageChoice("privacy")}
                </a>
              </p>
            </span>
          </label>
        </div>
        {errors.acceptTerms && (
          <div className="text-red-500 text-xs font-medium w-full text-center">
            {handleLanguageChoice("accept_terms")}
          </div>
        )}
        <button
          disabled={isSubmitting}
          type="submit"
          className={`relative border ${
            isSubmitting
              ? "border-gray-300 bg-gray-300 cursor-not-allowed"
              : "border-black bg-black cursor-pointer"
          } mt-5 py-3 rounded-md text-white`}
        >
          {handleLanguageChoice("next")}
          <FontAwesomeIcon
            className="absolute top-[50%] translate-y-[-50%] right-2.5"
            icon={faArrowRightLong}
          />
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

export default CreateAccount;
