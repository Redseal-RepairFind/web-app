import useLanguage from "../../../../hooks/useLanguage";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

const GstValidation = ({ handlePrev }: { handlePrev: any }) => {
  const [file, setFile] = useState<any>(null);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  interface ApiResponse {
    message: string;
    user?: any;
    data?: any;
    // Add other properties as needed
  }

  const navigate = useNavigate();

  const location = useLocation();

  const { handleLanguageChoice } = useLanguage();
  const { UpdateGST } = useAuth();

  const onSubmit = async (values: any) => {
    const gstType = location.pathname.includes("individual")
      ? "Individual"
      : "Company";

    // if (gstType === "Company" && !file)
    //   return toast.error("Please upload your certificate...");

    const payload = { ...values, gstType };

    try {
      toast.loading("Processing...");
      const data = (await UpdateGST(payload)) as ApiResponse;
      // console.log(data);
      toast.remove();
      toast.success(data?.message);
      sessionStorage.setItem("repairfind_user", JSON.stringify(data?.data));
      sessionStorage.removeItem("individual_session_step");
      sessionStorage.removeItem("company_session_step");
      setTimeout(() => {
        navigate("/quiz");
      }, 1000);
    } catch (e: any) {
      console.log({ e });
      toast.remove();
      toast.error(e?.response?.data?.message);
    }
  };

  const onDrop = (acceptedFiles: any) => {
    // Do something with the dropped files
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="w-full mt-[80px] py-4">
      <h1 className=" text-center mb-5 text-xl font-medium">
        {/* {handleLanguageChoice("enter_profile")} */}
        {handleLanguageChoice("gst_hst_validation")}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mb-10 flex-1">
          <label className="text-sm font-medium">
            {handleLanguageChoice("business_name")}
          </label>
          <input
            type="text"
            {...register("gstName", {
              required: true,
            })}
            className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
          />
        </div>
        <div className="w-full mb-10 flex-1">
          <label className="text-sm font-medium">
            {handleLanguageChoice("gst_number")}
            {/* GST Number */}
          </label>
          <input
            type="text"
            {...register("gstNumber", {
              required: true,
            })}
            className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
          />
        </div>
        {/* <div className="w-full mb-10 flex-1">
          <label className="text-sm font-medium">
            {handleLanguageChoice("business_name")}
            GST Type
          </label>
          <select
            {...register("gstType", {
              required: true,
            })}
            className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
          >
            <option value={"Individual"}>Individual</option>
            <option value={"Company"}>Company</option>
          </select>
        </div> */}
        {/* {location.pathname.includes("individual") ? (
          <div className="w-full mb-1 flex-1">
            <label className="text-sm font-medium">Link to Certificate</label>
            <input
              type="text"
              {...register("gstCertificate", {
                required: true,
              })}
              className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
            />
          </div>
        ) : (
          <div>
            <label className="text-sm font-medium">
              Upload Certificate of Incorporation
            </label>
            <div
              {...getRootProps()}
              className="cursor-pointer border border-slate-300 p-[20px] mt-[10px]"
            >
              <input {...getInputProps()} />
              {file ? (
                <div className=" text-center border border-gray-100 bg-gray-100 rounded-2xl px-5 py-3">
                  File: {file.name}
                </div>
              ) : (
                <div className="border text-center  border-gray-100 rounded-2xl bg-gray-100 px-5 py-3">
                  Click here or drag and drop a file to upload
                </div>
              )}
            </div>
          </div>
        )} */}

        <div className="flex my-4 items-center sm:flex-row flex-col gap-2 justify-between">
          <label
            className={`w-full flex items-center gap-1 py-2 ${
              errors.backgroundCheckConsent
                ? "border-red-500"
                : "border-transparent"
            } border-b border-t text-[12px] px-1 duration-200 cursor-pointer
      `}
          >
            <input
              {...register("backgroundCheckConsent", {
                required: true,
              })}
              type="checkbox"
              className="accent-black"
            />{" "}
            {handleLanguageChoice("consent")}
          </label>
        </div>
        {errors.backgroundCheckConsent && (
          <div className="text-red-500 text-xs font-medium w-full text-center">
            {handleLanguageChoice("consent_check")}
          </div>
        )}
        <div className="w-full flex items-center justify-center gap-4 mt-5">
          {/* <button
            className="relative border w-full border-black bg-transparent py-3 rounded-md text-black"
            onClick={(e) => {
              e.preventDefault();
              handlePrev();
            }}
          >
            Back
            <FontAwesomeIcon
              className="absolute top-[50%] translate-y-[-50%] left-2.5"
              icon={faArrowLeftLong}
            />
          </button> */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="relative border w-full border-black bg-black py-3 rounded-md text-white"
          >
            {handleLanguageChoice("next")}
            <FontAwesomeIcon
              className="absolute top-[50%] translate-y-[-50%] right-2.5"
              icon={faArrowRightLong}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default GstValidation;
