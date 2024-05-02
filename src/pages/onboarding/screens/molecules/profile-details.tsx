import React, { useState } from "react";
import useLanguage from "../../../../hooks/useLanguage";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import Switch from "react-switch";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileDetails = ({
  handleNext,
  handlePrev,
}: {
  handleNext: any;
  handlePrev: any;
}) => {
  const { handleLanguageChoice } = useLanguage();
  const { UpdateProfile } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const [mediaFiles, setMediaFiles] = useState<any[]>([]);

  const [emergencyJobs, setEmergencyJobs] = useState(false);

  const onVideoDrop = (acceptedFiles: any) => {
    // Update state with the new media files
    setMediaFiles([...mediaFiles, ...acceptedFiles]);
  };

  interface ApiResponse {
    message: string;
    user?: any;
    // Add other properties as needed
  }

  const { getRootProps: getRootVideoProps, getInputProps: getInputVideoProps } =
    useDropzone({
      onDrop: onVideoDrop,
      accept: {
        image: ["image/jpeg", "image/png"],
        video: ["video/mp4"],
      },
    });

  const [pictures, setPictures] = useState<any[]>([]);

  const onDrop = (acceptedFiles: any) => {
    // Update state with the new pictures
    setPictures([...pictures, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      image: ["image/jpeg", "image/png"],
    },
  });

  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const days = [
    handleLanguageChoice("mondays"),
    handleLanguageChoice("tuesdays"),
    handleLanguageChoice("wednesdays"),
    handleLanguageChoice("thursdays"),
    handleLanguageChoice("fridays"),
    handleLanguageChoice("saturdays"),
    handleLanguageChoice("sundays"),
  ];

  const handleCheckboxChange = (day: any) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const { register, handleSubmit } = useForm();

  const searchParams = new URLSearchParams(location.search);
  const accountType = searchParams.get("accountType");

  const onSubmit = async (values: any) => {
    if (!selectedDays.length)
      return toast.error("Please select days available...");
    console.log(values);

    toast.loading("Updating profile...");

    const payload = {
      ...values,
      emergencyJobs,
      availableDays: selectedDays,
      previousJobPhotos: pictures,
      previousJobVideos: mediaFiles,
    };

    console.log(payload);

    try {
      const data = (await UpdateProfile(payload)) as ApiResponse;
      console.log(data);
      toast.remove();
      toast.success(data?.message);
      setTimeout(() => {
        accountType === "employee" ? navigate("/quiz") : handleNext();
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
        {handleLanguageChoice("enter_profile")}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mb-10 flex-1">
          <label className="text-sm font-medium">
            {handleLanguageChoice("specialization")}
          </label>
          <input
            type="text"
            {...register("skill", {
              required: true,
            })}
            className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
          />
        </div>
        <div className="w-full mb-10 flex-1">
          <label className="text-sm font-medium">
            {handleLanguageChoice("years_of_exp")}
          </label>
          <input
            type="number"
            min={0}
            {...register("experienceYear", {
              required: true,
              min: {
                value: 0,
                message: "Experience year cannot be less than 0",
              },
            })}
            className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
          />
        </div>
        <div className="w-full mb-10 flex-1">
          <label className="text-sm font-medium">
            {handleLanguageChoice("about_me")}
          </label>
          <textarea
            rows={5}
            {...register("about", {
              required: true,
            })}
            className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
          />
        </div>
        {/* <div className="w-full mb-10 flex-1">
          <label className="text-sm font-medium">
            {handleLanguageChoice("address")}
          </label>
          <input
            type="text"
            {...register("address", {
              required: true,
            })}
            className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
          />
        </div> */}
        <div className="w-full mb-10 flex-1">
          <label className="text-sm font-medium">
            {handleLanguageChoice("available_days")}
          </label>
          <div className="flex items-center gap-4 flex-wrap mt-1">
            {days.map((day: string, index) => (
              <div key={day} className="flex items-center">
                <input
                  type="checkbox"
                  id={day}
                  checked={selectedDays.includes(day)}
                  onChange={() => handleCheckboxChange(day)}
                  className="accent-black mr-1 cursor-pointer"
                />
                <label className="cursor-pointer" htmlFor={day}>
                  {day}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex my-4 items-center sm:flex-row flex-col gap-2 justify-between">
          <span className="flex gap-1 font-medium flex-wrap">
            {handleLanguageChoice("available_for_emergency")}
          </span>
          <Switch
            onColor="#000000"
            onChange={() => setEmergencyJobs(!emergencyJobs)}
            checked={emergencyJobs}
          />
        </div>
        <div className="w-full border-t border-gray-300 mt-5 mb-10 flex-1"></div>
        <div className="w-full mb-10 flex-1">
          <label className="text-sm font-medium">
            {handleLanguageChoice("pictures_of_previous_jobs")}
          </label>
          <div
            {...getRootProps()}
            className="dropzone mt-1 cursor-pointer flex items-center justify-center py-5 rounded-md border border-gray-100 bg-gray-100"
          >
            <input {...getInputProps()} />
            <p className="bg-gray-200 py-3 px-7 rounded-lg">
              {handleLanguageChoice("browse_files")}
            </p>
          </div>
          <div className="mt-3 flex items-center flex-wrap gap-1">
            {pictures.map((picture, index) => (
              <img
                key={index}
                src={URL.createObjectURL(picture)}
                alt={`Uploaded ${index + 1}`}
                className="max-w-[100px] max-h-[100px]"
              />
            ))}
          </div>
        </div>
        <div className="w-full mb-10 flex-1">
          <label className="text-sm font-medium">
            {handleLanguageChoice("videos_of_previous_jobs")}
          </label>
          <div
            {...getRootVideoProps()}
            className="dropzone mt-1 cursor-pointer flex items-center justify-center py-5 rounded-md border border-gray-100 bg-gray-100"
          >
            <input {...getInputVideoProps()} />
            <p className="bg-gray-200 py-3 px-7 rounded-lg">
              {handleLanguageChoice("browse_files")}
            </p>
          </div>
          <div className="mt-3 flex items-center flex-wrap gap-1">
            {mediaFiles.map((file, index) => (
              <div key={index}>
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded ${index + 1}`}
                    className="max-w-[100px] max-h-[100px]"
                  />
                ) : file.type.startsWith("video/") ? (
                  <video controls width="100" height="100">
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <span>{`Uploaded ${index + 1}`}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full border-t border-gray-300 mt-5 mb-10 flex-1"></div>
        <div className="w-full flex items-center justify-center gap-4 mt-5">
          <button
            className="relative border w-full border-black bg-transparent py-3 rounded-md text-black"
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            {handleLanguageChoice("skip")}
            {/* <FontAwesomeIcon
              className="absolute top-[50%] translate-y-[-50%] left-2.5"
              icon={faArrowLeftLong}
            /> */}
          </button>
          <button
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

export default ProfileDetails;
