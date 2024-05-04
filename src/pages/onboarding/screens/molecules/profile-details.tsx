import React, { useState } from "react";
import useLanguage from "../../../../hooks/useLanguage";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import Switch from "react-switch";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import ReactS3 from "react-s3";
import S3 from "react-aws-s3";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const skills = [
  { label: "Carpenter", value: "Carpenter" },
  { label: "Plumber", value: "Plumber" },
  { label: "Painter", value: "Painter" },
  { label: "Worker", value: "Worker" },
];

const experience = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10+", value: "10+" },
];

const config = {
  bucketName: process.env.REACT_APP_AWS_S3_BUCKET,
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
};

const ProfileDetails = ({
  handleNext,
  handlePrev,
}: {
  handleNext: any;
  handlePrev: any;
}) => {
  const { handleLanguageChoice } = useLanguage();
  const { UpdateProfile } = useAuth();

  const credentials: any = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  };

  const s3Client = new S3Client({
    region: process.env.REACT_APP_AWS_REGION,
    credentials,
  });

  const ReactS3Client = new S3(config);

  const location = useLocation();
  const navigate = useNavigate();

  const [mediaFiles, setMediaFiles] = useState<any[]>([]);

  const [emergencyJobs, setEmergencyJobs] = useState(false);

  const [address, setAddress] = useState<any>(null);

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
    if (!address) return toast.error("Please enter your address...");

    if (!selectedDays.length)
      return toast.error("Please select days available...");
    // console.log(values);

    const payload: any = {
      ...values,
      emergencyJobs,
      address,
      availableDays: selectedDays,
      previousJobPhotos: pictures,
      previousJobVideos: mediaFiles,
    };

    console.log(payload);

    const params = {
      Bucket: process.env.REACT_APP_AWS_S3_BUCKET,
      Key: "Image",
      Body: payload.previousJobPhotos[0], // Data you want to upload
    };

    // Upload the data to S3
    try {
      const data = await s3Client.send(new PutObjectCommand(params));
      console.log("Successfully uploaded data to S3", data);
    } catch (error) {
      console.error("Error uploading data to S3", error);
    }

    // const params = { params: payload.previousJobPhotos };

    // const command = new ListBucketsCommand(params);

    // try {
    //   toast.loading("Updating profile...");
    //   const data = await client.send(command);
    //   console.log(data);
    //   toast.remove();
    //   process data.
    // } catch (error) {
    //   console.log(error);
    //   toast.remove();
    //   error handling.
    // } finally {
    //   finally.
    // }

    // ReactS3Client.uploadFile(payload.previousJobPhotos[0], "images")
    //   .then((data: any) => {
    //     console.log(data);
    //     toast.remove();
    //     toast.success("Uploaded images successfully...");
    //   })
    //   .catch((err: any) => {
    //     console.log({ err });
    //     toast.remove();
    //     toast.error("Error, please try again later...");
    //   });

    // ReactS3.uploadFile(payload.previousJobPhotos[0], config)
    //   .then((data: any) => {
    //     console.log(data);
    //     toast.remove();
    //     toast.success("Uploaded images successfully...");
    //   })
    //   .catch((err: any) => {
    //     console.log({ err });
    //     toast.remove();
    //     toast.error("Error, please try again later...");
    //   });

    // try {
    //   const data = (await UpdateProfile(payload)) as ApiResponse;
    //   console.log(data);
    //   toast.remove();
    //   toast.success(data?.message);
    //   setTimeout(() => {
    //     accountType === "employee" ? navigate("/quiz") : handleNext();
    // sessionStorage.removeItem("employee_session_step");
    //   }, 1000);
    // } catch (e: any) {
    //   console.log({ e });
    //   toast.remove();
    //   toast.error(e?.response?.data?.message);
    // }
  };

  const [autocomplete, setAutocomplete] = useState<any>(null);

  const onLocationSelect = (locationData: any) => {
    setAddress(locationData);
  };

  // console.log(address);

  const handlePlaceSelect = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place && place.geometry) {
        const locationData = {
          address: place.formatted_address,
          city: place.address_components.find(
            (component: any) =>
              component.types.includes("locality") ||
              component.types.includes("administrative_area_level_1")
          ).long_name,
          country: place.address_components.find((component: any) =>
            component.types.includes("country")
          ).long_name,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        };
        onLocationSelect(locationData);
      } else {
        console.error("Place data is not available");
      }
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
          <select
            {...register("skill", {
              required: true,
            })}
            className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
          >
            {skills.map((skill) => (
              <option value={skill.value}>{skill.label}</option>
            ))}
          </select>
        </div>
        <div className="w-full mb-10 flex-1">
          <label className="text-sm font-medium">
            {handleLanguageChoice("years_of_exp")}
          </label>
          <select
            {...register("experienceYear", {
              required: true,
            })}
            className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
          >
            {experience.map((item) => (
              <option value={item.value}>{item.label}</option>
            ))}
          </select>
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
            {handleLanguageChoice("address")}
          </label>
          <LoadScript
            googleMapsApiKey={`${process.env.REACT_APP_MAP_API_KEY}`}
            libraries={["places"]}
          >
            <Autocomplete
              onLoad={(autocomplete) => setAutocomplete(autocomplete)}
              onPlaceChanged={handlePlaceSelect}
            >
              <input
                className="w-full mt-1 py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
                type="text"
                placeholder="Enter your location"
              />
            </Autocomplete>
          </LoadScript>
        </div>
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
