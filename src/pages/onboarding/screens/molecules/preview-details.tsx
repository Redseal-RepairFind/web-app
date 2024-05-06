import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faHandFist,
  faCalendarCheck,
  faLocationDot,
  faCalendarDays,
  faBell,
  faImage,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Switch from "react-switch";

const PreviewDetails = ({
  handleModal,
  data,
}: {
  handleModal: any;
  data: any;
}) => {
  // console.log(data);

  const repairfind_user = sessionStorage.getItem("repairfind_user");

  const [currentTab, setCurrentTab] = useState("profile");

  const parsedUser = repairfind_user && JSON.parse(repairfind_user);

  // console.log(parsedUser);

  const mapStyles = {
    height: "150px",
    width: "100%",
    border: "1px solid #ccc",
    padding: "5px",
  };

  const defaultCenter = {
    lat: data?.location?.latitude,
    lng: data?.location?.longitude,
  };

  // console.log(data?.location);
  return (
    <div className="px-4 py-2">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{parsedUser?.companyName}</h2>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentTab("profile")}
          className={`text-gray-600 font-medium flex-1 border-b pb-2  ${
            currentTab === "profile" ? "border-black" : "border-gray-300"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setCurrentTab("media")}
          className={`text-gray-600 font-medium flex-1 border-b pb-2  ${
            currentTab === "media" ? "border-black" : "border-gray-300"
          }`}
        >
          Media
        </button>
      </div>
      {currentTab === "profile" && (
        <>
          <div className="mb-4 border-b border-gray-300 py-4 flex items-start justify-between">
            <h2 className="font-semibold">
              <FontAwesomeIcon className="mr-1" icon={faHandFist} />
              Skill / Specialization
            </h2>
            <p className="text-gray-700 font-medium">{data?.skill}</p>
          </div>
          <div className="mb-4 border-b border-gray-300 py-4 flex items-start justify-between">
            <h2 className="font-semibold">
              <FontAwesomeIcon className="mr-1" icon={faCalendarCheck} />
              Years of Experience
            </h2>
            <p className="text-gray-700 font-medium">{data?.experienceYear}</p>
          </div>
          <div className="mb-4 border-b border-gray-300 py-4 flex items-start justify-center flex-col">
            <h2 className="font-semibold">
              <FontAwesomeIcon className="mr-1" icon={faExclamationCircle} />
              About Me
            </h2>
            <p className="text-gray-600 w-full text-start mt-1">
              {data?.about}
            </p>
          </div>
          <div className="mb-4 border-b border-gray-300 py-4 flex items-start justify-center flex-col">
            <h2 className="font-semibold mb-1">
              <FontAwesomeIcon className="mr-1" icon={faLocationDot} />
              Address
            </h2>
            {data?.location && (
              <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
              >
                <Marker position={defaultCenter} />
              </GoogleMap>
            )}
          </div>
          <div className="mb-4 border-b border-gray-300 py-4 flex items-start justify-center flex-col">
            <h2 className="font-semibold">
              <FontAwesomeIcon className="mr-1" icon={faCalendarDays} />
              Available Days
            </h2>
            <div className="flex flex-wrap gap-2 mt-1">
              {data?.selectedDays?.map((day: string, index: number) => (
                <span
                  key={index}
                  className="border border-gray-200 bg-gray-200 rounded-3xl px-5 py-2"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4 border-b border-gray-300 py-4 flex items-start justify-between">
            <h2 className="font-semibold">
              <FontAwesomeIcon className="mr-1" icon={faBell} />
              Available for Emergency Jobs
            </h2>
            <Switch
              onColor="#000000"
              disabled={true}
              onChange={() => console.log("")}
              checked={data?.emergencyJobs}
            />
          </div>
        </>
      )}
      {currentTab === "media" && (
        <>
          <div className="mb-4 border-b border-gray-300 py-4 flex items-start justify-center flex-col">
            <h2 className="font-semibold">
              <FontAwesomeIcon className="mr-1" icon={faImage} />
              Pictures of Previous Jobs
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {data?.pictures?.map((picture: any, index: number) => (
                <img
                  src={URL.createObjectURL(picture)}
                  alt={`Uploaded ${index + 1}`}
                  className="max-w-[100px] max-h-[100px]"
                />
              ))}
            </div>
          </div>
          <div className="mb-4 border-b border-gray-300 py-4 flex items-start justify-center flex-col">
            <h2 className="font-semibold">
              <FontAwesomeIcon className="mr-1" icon={faVideo} />
              Videos of Previous Jobs
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {data?.mediaFiles?.map((video: any, index: number) => (
                <video controls width="100" height="100">
                  <source src={URL.createObjectURL(video)} type={video.type} />
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          </div>
        </>
      )}
      <button
        onClick={() => handleModal()}
        className=" mt-3 border w-full border-black bg-black py-3 rounded-md text-white"
      >
        Close
      </button>
    </div>
  );
};

export default PreviewDetails;
