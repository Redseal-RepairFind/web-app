/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import useLanguage from "../../../../hooks/useLanguage";
import useAuth from "../../../../hooks/useAuth";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const config = {
  bucketName: process.env.REACT_APP_AWS_S3_BUCKET,
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
};

const UploadLogo = ({
  handleNext,
  handlePrev,
}: {
  handleNext: any;
  handlePrev: any;
}) => {
  const { handleLanguageChoice } = useLanguage();

  const [file, setFile] = useState<any>(null);

  const { AddCompanyDetails } = useAuth();

  const handleLogo = async () => {
    if (!file) return toast.error("Please select a logo first");

    AWS.config.update({
      region: config.region,
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    });
    const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

    if (!config.bucketName) {
      console.error("Bucket name is not defined.");
      return;
    }

    const params = {
      Bucket: config.bucketName,
      Key: `images/${uuidv4()}`,
      Body: file,
    };

    toast.loading("Processing logo...");

    s3.upload(params)
      .promise()
      .then(async (response: any) => {
        try {
          // console.log({ companyLogo: response?.Location });
          const data = await AddCompanyDetails({
            companyLogo: response?.Location,
          });
          toast.remove();
          toast.success(data?.message);
          setTimeout(() => {
            handleNext();
          }, 500);
        } catch (e: any) {
          console.log({ e });
          toast.remove();
          toast.error(e?.response?.data?.message);
        }
      })
      .catch((err: any) => {
        toast.remove();
        toast.error("Error, kindly reload the page or try again...");
        console.log(err);
      });
  };

  const onDrop = (acceptedFiles: any) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { image: ["image/jpeg", "image/png"] },
    maxFiles: 1, // Allow only one file to be dropped
  });

  return (
    <div className="w-full mt-[80px]">
      <h1 className=" text-center mb-5 text-xl font-medium">
        {handleLanguageChoice("upload_company_logo")}
      </h1>
      <div className="flex items-center justify-center mb-10 p-5">
        <div
          {...getRootProps()}
          className="cursor-pointer relative border border-gray-100 bg-gray-100 rounded-full overflow-hidden h-[200px] w-[200px] flex items-center justify-center mt-[10px]"
        >
          <input {...getInputProps()} />
          {file ? (
            <img src={URL.createObjectURL(file)} alt="Uploaded" />
          ) : (
            <div className="text-center bg-gray-200 rounded-3xl px-5 py-3">
              Upload logo here
            </div>
          )}
        </div>
      </div>
      <button
        onClick={handleLogo}
        className={`relative border w-full border-black bg-black text-white py-3 rounded-md`}
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

export default UploadLogo;
