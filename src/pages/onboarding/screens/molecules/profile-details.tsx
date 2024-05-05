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
import { Autocomplete } from "@react-google-maps/api";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import CenteredModal from "../../../../components/ui/centered-modal";
import PreviewDetails from "./preview-details";

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

  const location = useLocation();
  const navigate = useNavigate();

  const [mediaFiles, setMediaFiles] = useState<any[]>([]);

  const [emergencyJobs, setEmergencyJobs] = useState(false);

  const [showPreview, hidePreview] = useState<boolean>(false);

  const [previewDetails, setPreviewDetails] = useState({});

  const onVideoDrop = (acceptedFiles: any) => {
    // Update state with the new media files
    setMediaFiles([...mediaFiles, ...acceptedFiles]);
  };

  const [address, setAddress] = useState<any>(null);

  interface ApiResponse {
    message: string;
    user?: any;
    data?: any;
    // Add other properties as needed
  }

  const { getRootProps: getRootVideoProps, getInputProps: getInputVideoProps } =
    useDropzone({
      onDrop: onVideoDrop,
      accept: {
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

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useForm();

  const togglePreview = () => {
    hidePreview(!showPreview);
  };

  const saveToSession = () => {
    const previewData = {
      ...getValues(),
      location: address,
      selectedDays,
      pictures,
      mediaFiles,
    };

    sessionStorage.setItem(
      "session_repairfind_profile_onboarding",
      JSON.stringify(previewData)
    );
  };

  const searchParams = new URLSearchParams(location.search);
  const accountType = searchParams.get("accountType");

  const uploadPhotoToS3 = async (photo: any) => {
    if (!config.bucketName) {
      console.error("Bucket name is not defined.");
      return null; // Return null to indicate failure
    }

    const params = {
      Bucket: config.bucketName,
      Key: `images/${uuidv4()}`,
      Body: photo,
    };

    AWS.config.update({
      region: config.region,
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    });
    const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

    try {
      const data = await s3.upload(params).promise();
      // console.log(data);
      return data?.Location; // Return the location after successful upload
    } catch (err) {
      console.error(err);
      return null; // Return null to indicate failure
    }
  };

  const onSubmit = async (values: any) => {
    if (!address) return toast.error("Please enter your address...");

    if (!pictures.length)
      return toast.error("Pleas upload pictures of your previous jobs...");

    if (!selectedDays.length)
      return toast.error("Please select days available...");

    const photoLocations: string[] = [];
    const videoLocations: string[] = [];

    toast.loading("Processing...");

    try {
      // Upload all photos and gather their locations
      for (const photo of pictures) {
        const location = await uploadPhotoToS3(photo);

        if (location) {
          // console.log(location);
          photoLocations.push(location); // Add the location to the array if it's not null
        }
      }

      // Proceed with the remaining logic using the gathered locations
      // console.log("Photos uploaded successfully:", photoLocations);
      const photoUrl = photoLocations.map((location) => {
        return { url: location };
      });
      // console.log(photoUrl);

      if (mediaFiles.length) {
        for (const video of mediaFiles) {
          const location = await uploadPhotoToS3(video);

          if (location) {
            // console.log(location);
            videoLocations.push(location); // Add the location to the array if it's not null
          }
        }
      }
      // Proceed with the remaining logic using the gathered locations
      // console.log("Videos uploaded successfully:", videoLocations);
      const videoUrl = mediaFiles.length
        ? videoLocations.map((location) => {
            return { url: location };
          })
        : [];
      // console.log(videoUrl);
      // setMediaLocations(locationUrl);

      const payload: any = videoLocations.length
        ? {
            ...values,
            emergencyJobs,
            location: { ...address },
            availableDays: selectedDays,
            previousJobPhotos: photoLocations.map((location) => {
              return { url: location };
            }),
            previousJobVideos: videoLocations.map((location) => {
              return { url: location };
            }),
          }
        : {
            ...values,
            emergencyJobs,
            location: { ...address },
            availableDays: selectedDays,
            previousJobPhotos: photoLocations.map((location) => {
              return { url: location };
            }),
          };

      // console.log(payload);

      try {
        const data = (await UpdateProfile(payload)) as ApiResponse;
        // console.log(data);
        toast.remove();
        toast.success(data?.message);
        sessionStorage.setItem("repairfind_user", JSON.stringify(data?.data));
        sessionStorage.removeItem("session_repairfind_profile_onboarding");
        setTimeout(() => {
          accountType === "employee" ? navigate("/quiz") : handleNext();
          sessionStorage.removeItem("employee_session_step");
        }, 800);
      } catch (e: any) {
        console.log({ e });
        toast.remove();
        toast.error(e?.response?.data?.message);
      }

      // Perform other logic (e.g., submitting data to an API) using the locations array
    } catch (error) {
      console.error("Error uploading photos:", error);
    }
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
    <React.Fragment>
      <CenteredModal open={showPreview} setOpen={togglePreview} title="">
        <PreviewDetails data={previewDetails} handleModal={togglePreview} />
      </CenteredModal>
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
          <div className="w-full mb-10 flex-1">
            <label className="text-sm font-medium">
              {handleLanguageChoice("address")}
            </label>
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
                      <source
                        src={URL.createObjectURL(file)}
                        type={file.type}
                      />
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
                toast.loading("Loading preview...");
                // console.log(getValues());
                const previewData = {
                  ...getValues(),
                  location: address,
                  emergencyJobs,
                  selectedDays,
                  pictures,
                  mediaFiles,
                };
                setPreviewDetails(previewData);
                // console.log(previewData);
                setTimeout(() => {
                  toast.remove();
                  togglePreview();
                }, 1500);
              }}
            >
              {handleLanguageChoice("preview")}
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
    </React.Fragment>
  );
};

export default ProfileDetails;
