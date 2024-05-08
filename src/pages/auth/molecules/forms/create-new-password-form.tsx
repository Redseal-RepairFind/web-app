import React from "react";

import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../../../../components/global/container";
import Layout from "../../../../components/global/layout";
import PasswordField from "../../../../components/form/password-field";
import useLanguage from "../../../../hooks/useLanguage";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";

const NewPassword = ({ handlePrev }: { handlePrev: any }) => {
  const { handleSubmit, register } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const { handleLanguageChoice } = useLanguage();
  const { ResetPassword } = useAuth();

  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const otp = searchParams.get("otp");

  const handleReset = async (values: any) => {
    if (values.password !== values.passwordConfirmation)
      return toast.error("Passwords do not match");

    const payload = { otp, email, password: values.password };
    toast.loading("Processing...");
    try {
      const data = await ResetPassword(payload);
      toast.remove();
      toast.success(data?.message);
      setTimeout(() => {
        navigate(`/`);
      }, 1000);
    } catch (e: any) {
      console.log({ e });
      toast.remove();
      toast.error(e?.response?.data?.message);
    }
  };
  return (
    <Layout>
      <Container className="flex items-center sm:min-h-[77.4vh] min-h-[64.2vh] justify-center">
        <div className="flex-1 p-3">
          <form
            className="w-full flex flex-col max-w-2xl mx-auto mt-4 rounded-md p-8 bg-white"
            onSubmit={handleSubmit(handleReset)}
          >
            <h1 className="font-semibold text-2xl mb-2">
              {handleLanguageChoice("create_new_password")}
            </h1>
            <span className=" mb-7 text-gray-500">
              {handleLanguageChoice("create_new_password_subhead")}
            </span>
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
            <button className="border mt-7 border-black bg-black py-3 rounded-md text-white">
              {handleLanguageChoice("continue")}
            </button>
          </form>
        </div>
      </Container>
    </Layout>
  );
};

export default NewPassword;
