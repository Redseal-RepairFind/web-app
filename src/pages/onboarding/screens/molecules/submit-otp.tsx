import React, { useState } from "react";
import OtpInput from "react-otp-input";

import Layout from "../../../../components/global/layout";
import Container from "../../../../components/global/container";
import { useLocation } from "react-router-dom";

import useAuth from "../../../../hooks/useAuth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

import useLanguage from "../../../../hooks/useLanguage";
import toast from "react-hot-toast";

interface ApiResponse {
  message: string;
  user?: any;
  accessToken?: any;
  // Add other properties as needed
}

const SubmitOtp = () => {
  const [otp, setOtp] = useState("");

  const { VerifyEmail, ResendEmail } = useAuth();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  const handleResend = async () => {
    try {
      toast.loading("Processing...");
      const data = (await ResendEmail({ email })) as ApiResponse;
      toast.remove();
      toast.success(data?.message);
      console.log(data);
    } catch (e: any) {
      console.log({ e });
      toast.remove();
      toast.error(e?.response?.data?.message);
    }
  };

  //   console.log(email);

  //   console.log(otp.length);

  const payload = { email, otp };

  const { handleLanguageChoice } = useLanguage();

  const handleBtnStyle = () => {
    if (otp.length === 4)
      return `relative border border-black bg-black mt-5 py-3 rounded-md text-white cursor-pointer`;

    return `relative border border-gray-100 bg-gray-100 mt-5 py-3 rounded-md text-gray-600 cursor-not-allowed`;
  };

  return (
    <Layout className={"bg-gray-100"}>
      <Container className="flex w-full items-center py-3 justify-center">
        <div className="flex-1 p-3 bg-white max-w-[550px]">
          <div className="w-full flex flex-col mt-4 rounded-md p-8 bg-white">
            <p className="font-semibold text-2xl mb-1 text-center">
              {handleLanguageChoice("account_verification")}
            </p>
            <span className=" mb-7 text-gray-500 text-center font-medium">
              {handleLanguageChoice("phone_verify_notice")}
            </span>
            <div className="mb-2">
              <OtpInput
                value={otp}
                onChange={setOtp}
                containerStyle={"flex items-center justify-between mt-2 gap-1"}
                inputStyle={
                  "border border-gray-200 flex-1 h-20 bg-gray-200 focus:bg-white duration-200 outline-none focus:ring-0 focus:border-black rounded-md"
                }
                numInputs={4}
                renderSeparator={""}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <span className="mb-7 text-gray-500 text-xs font-medium flex gap-1 items-center">
              {handleLanguageChoice("didnt_get_code")} (0:05){" "}
              <button onClick={handleResend} className="text-black">
                {handleLanguageChoice("click_to_resend")}
              </button>
            </span>
            <button
              onClick={() => VerifyEmail(payload)}
              className={handleBtnStyle()}
            >
              {handleLanguageChoice("next")}
              <FontAwesomeIcon
                className="absolute top-[50%] translate-y-[-50%] right-2.5"
                icon={faArrowRightLong}
              />
            </button>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default SubmitOtp;
