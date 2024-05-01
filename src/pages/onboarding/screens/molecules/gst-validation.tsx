import useLanguage from "../../../../hooks/useLanguage";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const GstValidation = ({ handlePrev }: { handlePrev: any }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  interface ApiResponse {
    message: string;
    user?: any;
    // Add other properties as needed
  }

  const navigate = useNavigate();

  const { handleLanguageChoice } = useLanguage();
  const { UpdateGST } = useAuth();

  const onSubmit = async (values: any) => {
    try {
      const data = (await UpdateGST(values)) as ApiResponse;
      console.log(data);
      toast.remove();
      toast.success(data?.message);
      setTimeout(() => {
        navigate("/account");
      }, 1000);
    } catch (e: any) {
      console.log({ e });
      toast.remove();
      toast.error(e?.response?.data?.message);
    }
  };

  return (
    <div className="w-full mt-[80px] py-4">
      <h1 className=" text-center mb-5 text-xl font-medium">
        {/* {handleLanguageChoice("enter_profile")} */}
        GST/HST Validation
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
            {/* {handleLanguageChoice("business_name")} */}
            GST Number
          </label>
          <input
            type="text"
            {...register("gstNumber", {
              required: true,
            })}
            className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
          />
        </div>
        <div className="w-full mb-10 flex-1">
          <label className="text-sm font-medium">
            {/* {handleLanguageChoice("business_name")} */}
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
        </div>
        <div className="w-full mb-1 flex-1">
          <label className="text-sm font-medium">
            {/* {handleLanguageChoice("business_name")} */}
            Link to Certificate
          </label>
          <input
            type="text"
            {...register("gstCertificate", {
              required: true,
            })}
            className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
          />
        </div>
        <div className="flex my-4 items-center sm:flex-row flex-col gap-2 justify-between">
          <label
            className={`w-full bg-gray-100 rounded-md px-2 flex items-center gap-1 py-3 border-transparent border-b border-t text-[12px] duration-200 cursor-pointer
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
        <div className="w-full flex items-center justify-center gap-4 mt-5">
          <button
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
          </button>
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
