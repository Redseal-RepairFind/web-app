import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import useLanguage from "../../../../hooks/useLanguage";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";

const TakePhoto = ({
  handleNext,
  handlePrev,
}: {
  handleNext: any;
  handlePrev: any;
}) => {
  const { handleLanguageChoice } = useLanguage();

  const { CreateIdentity } = useAuth();

  const [verifyUrl, setVerifyUrl] = useState("");

  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = React.useRef<any>(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  console.log(verifyUrl);

  const handleIdentity = async () => {
    toast.remove();
    toast.loading("Fetching...");
    try {
      const data = await CreateIdentity();
      toast.remove();
      toast.success(data?.message);
      setVerifyUrl(data?.data?.url);
    } catch (e: any) {
      console.log({ e });
      toast.remove();
      toast.error(e?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleIdentity();
  }, []);

  return (
    <div className="w-full mt-[80px]">
      <h1 className=" text-center mb-5 text-xl font-medium">
        {/* {handleLanguageChoice("take_photo")} */}
        Verify your Identity
      </h1>
      <div className="flex items-center justify-center p-5">
        <iframe
          title="User verification"
          src={verifyUrl}
          className="w-[100%] min-h-[600px] border border-gray-200"
        />
        {/* {!showCamera && (
          <div className="w-full max-w-40 border border-gray-200 bg-gray-200 rounded-full">
            <button
                onClick={() => setShowCamera(true)}
              onClick={handleIdentity}
              className="inset-0 font-medium w-full h-full"
              style={{ aspectRatio: "1/1" }}
            >
              {handleLanguageChoice("open_camera")}
              Click to Verify
            </button>
          </div>
        )}
        {showCamera && (
          <div>
            <div className="w-full text-center">
              {image ? (
                <img
                  src={image}
                  alt="Snap"
                  style={{ maxWidth: "100%", maxHeight: "500px" }}
                />
              ) : (
                <Webcam
                  audio={false}
                  height={500}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={500}
                  style={{ border: "1px solid #ccc" }}
                />
              )}
            </div>
            {!image ? (
              <div className="w-full mt-5">
                <button
                  className="border w-full border-black bg-black py-3 rounded-md text-white"
                  onClick={capture}
                >
                  Capture
                </button>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center gap-4 mt-5">
                <button
                  className="border w-full border-black bg-transparent py-3 rounded-md text-black"
                  onClick={() => setImage(null)}
                >
                  {handleLanguageChoice("open_camera")}
                </button>
                <button
                  onClick={() => {
                    toast.loading("Processing image...");

                    setTimeout(() => {
                      toast.remove();
                      toast.success("Image verified successfully...");
                      handleNext();
                    }, 1000);
                  }}
                  className="relative border w-full border-black bg-black py-3 rounded-md text-white"
                >
                  {handleLanguageChoice("next")}
                  <FontAwesomeIcon
                    className="absolute top-[50%] translate-y-[-50%] right-2.5"
                    icon={faArrowRightLong}
                  />
                </button>
              </div>
            )}
          </div>
        )} */}
      </div>
      <button
        onClick={() => handleNext()}
        className="relative border w-full border-black bg-black py-3 rounded-md text-white"
      >
        {handleLanguageChoice("next")}
        <FontAwesomeIcon
          className="absolute top-[50%] translate-y-[-50%] right-2.5"
          icon={faArrowRightLong}
        />
      </button>
    </div>
  );
};

export default TakePhoto;
