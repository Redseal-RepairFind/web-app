import React from "react";
import { useMutation } from "react-query";
import { auth } from "../api/auth";
import toast from "react-hot-toast";
import parsePhoneNumber from "libphonenumber-js";
import { useLocation, useNavigate } from "react-router-dom";

const useAuth = () => {
  const { mutateAsync: CreateAccount } = useMutation(auth.createAccount);
  const { mutateAsync: VerifyOTP } = useMutation(auth.verifyOtp);

  const location = useLocation();
  const navigate = useNavigate();

  interface ApiResponse {
    message: string;
    user?: any;
    // Add other properties as needed
  }

  const returnType = () => {
    if (location.pathname.includes("individual")) return "Individual";
    else {
      return "Company";
    }
  };

  const handleCreate = async (values: any) => {
    const [year, month, day] = values.dateOfBirth.split("-");

    const formattedDateOfBirth = `${day}/${month}/${year}`;

    const phone = parsePhoneNumber(values.phoneNumber);

    if (!phone) return toast.error("Please enter your phone number...");

    const payload = {
      ...values,
      dateOfBirth: formattedDateOfBirth,
      phoneNumber: {
        code: phone.countryCallingCode,
        number: phone.nationalNumber,
      },
      accountType: returnType(),
    };

    try {
      toast.loading("Processing...");
      const data = (await CreateAccount(payload)) as ApiResponse;
      toast.remove();
      toast.success(data?.message);
      setTimeout(() => {
        navigate(`/onboarding/submit-otp?email=${values.email}`);
      }, 1000);
    } catch (e: any) {
      console.log({ e });
      toast.remove();
      toast.error(e?.response?.data?.message);
    }
  };

  const VerifyEmail = async (payload: any) => {
    try {
      toast.loading("Processing...");
      const data = (await VerifyOTP(payload)) as ApiResponse;
      toast.remove();
      toast.success(data?.message);
      setTimeout(() => {
        navigate(
          `/onboarding/update-information?accountType=${data?.user?.accountType?.toLowerCase()}`
        );
      }, 1000);
    } catch (e: any) {
      console.log({ e });
      toast.remove();
      toast.error(e?.response?.data?.message);
    }
  };

  return { handleCreate, VerifyEmail };
};

export default useAuth;
