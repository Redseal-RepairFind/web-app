/* eslint-disable no-restricted-globals */
import { useMutation } from "react-query";
import { auth } from "../api/auth";
import toast from "react-hot-toast";
import parsePhoneNumber from "libphonenumber-js";
import { useLocation, useNavigate } from "react-router-dom";

const useAuth = () => {
  const { mutateAsync: Login } = useMutation(auth.login);
  const { mutateAsync: CreateAccount } = useMutation(auth.createAccount);
  const { mutateAsync: VerifyOTP } = useMutation(auth.verifyOtp);
  const { mutateAsync: UpdateProfile } = useMutation(auth.updateProfile);
  const { mutateAsync: CreateIdentity } = useMutation(
    auth.createStripeIdentity
  );
  const { mutateAsync: UpdateGST } = useMutation(auth.updateGst);
  const { mutateAsync: GetOTP } = useMutation(auth.getOtp);
  const { mutateAsync: VerifyAccount } = useMutation(auth.verifyEmail);
  const { mutateAsync: ResetPassword } = useMutation(auth.resetPassword);
  const { mutateAsync: ResendEmail } = useMutation(auth.resendEmail);
  const { mutateAsync: AddCompanyDetails } = useMutation(
    auth.addCompanyDetails
  );
  const { mutateAsync: SubmitQuiz } = useMutation(auth.submitQuiz);
  const { mutateAsync: DeleteAccount } = useMutation(auth.deleteAccount);

  const location = useLocation();
  const navigate = useNavigate();

  interface ApiResponse {
    message: string;
    user?: any;
    accessToken?: any;
    data?: any;
    // Add other properties as needed
  }

  const returnType = () => {
    if (location.pathname.includes("individual")) return "Individual";
    else if (location.pathname.includes("company")) {
      return "Company";
    } else {
      return "Employee";
    }
  };

  const handleCreate = async (values: any) => {
    // console.log(values);
    const phone = parsePhoneNumber(values.phoneNumber);

    if (!phone) return toast.error("Please enter your phone number...");

    const phoneNumber = location.pathname.includes("company")
      ? values.phoneNumber
      : {
          code: phone.countryCallingCode,
          number: phone.nationalNumber,
        };
    if (location.pathname.includes("company")) {
      const payload = {
        ...values,
        phoneNumber,
        accountType: returnType(),
      };

      try {
        toast.loading("Processing...");
        const data = (await CreateAccount(payload)) as ApiResponse;
        toast.remove();
        toast.success(data?.message);
        sessionStorage.setItem("repairfind_user", JSON.stringify(data?.data));
        // console.log(data);
        setTimeout(() => {
          navigate(`/onboarding/submit-otp?email=${values.email}`);
        }, 1000);
      } catch (e: any) {
        console.log({ e });
        toast.remove();
        toast.error(e?.response?.data?.message);
      }
    } else {
      const [year, month, day] = values.dateOfBirth.split("-");

      const formattedDateOfBirth = `${day}/${month}/${year}`;

      const payload = {
        ...values,
        dateOfBirth: formattedDateOfBirth,
        phoneNumber,
        accountType: returnType(),
      };

      try {
        toast.loading("Processing...");
        const data = (await CreateAccount(payload)) as ApiResponse;
        toast.remove();
        toast.success(data?.message);
        sessionStorage.setItem("repairfind_user", JSON.stringify(data?.user));
        // console.log(data);
        setTimeout(() => {
          navigate(`/onboarding/submit-otp?email=${values.email}`);
        }, 1000);
      } catch (e: any) {
        console.log({ e });
        toast.remove();
        toast.error(e?.response?.data?.message);
      }
    }
  };

  const VerifyEmail = async (payload: any) => {
    try {
      toast.loading("Processing...");
      const data = (await VerifyOTP(payload)) as ApiResponse;
      toast.remove();
      toast.success(data?.message);
      sessionStorage.setItem("repairfind_user", JSON.stringify(data?.user));
      sessionStorage.setItem("userToken", data?.accessToken);
      // console.log(data);
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
        if (user?.accountType.toLowerCase() !== "company") {
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
        if (user?.accountType.toLowerCase() !== "company") {
          return navigate(`/account`);
        }
        toast.remove();
        toast.error("Kindly complete your onboarding process...");
        // if (user?.accountType.toLowerCase() === "individual") {
        //   return navigate(`/quiz`);
        // }
        sessionStorage.setItem(
          `${user?.accountType?.toLowerCase()}_session_step`,
          `${user?.onboarding?.stage?.status - 1}`
        );
        navigate(
          `/onboarding/update-information?accountType=${user?.accountType.toLowerCase()}`
        );
      } else if (user?.onboarding?.stage?.status === 5) {
        if (user?.accountType.toLowerCase() !== "company") {
          return navigate(`/account`);
        }
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

  const handleDeactivate = async () => {
    if (confirm("Are you sure you wish to deactivate your account?")) {
      toast.loading("De-activating your account...");
      try {
        const data = await DeleteAccount();
        toast.remove();
        toast.success(data?.message);
        sessionStorage.clear();
        setTimeout(() => {
          navigate(`/`);
        }, 300);
      } catch (e: any) {
        console.log({ e });
        toast.remove();
        toast.error(e?.response?.data?.message);
      }
    }
  };

  return {
    handleCreate,
    VerifyEmail,
    UpdateProfile,
    CreateIdentity,
    UpdateGST,
    GetOTP,
    VerifyAccount,
    ResetPassword,
    Login,
    ResendEmail,
    AddCompanyDetails,
    SubmitQuiz,
    handleLogin,
    handleDeactivate,
  };
};

export default useAuth;
