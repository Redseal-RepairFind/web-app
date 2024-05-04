import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import useLanguage from "../../../../hooks/useLanguage";
import useAuth from "../../../../hooks/useAuth";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

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
    try {
      toast.loading("Processing...");
      const data = await AddCompanyDetails({ companyLogo: file });
      toast.remove();
      toast.success(data?.message);
      console.log(data);
      setTimeout(() => {
        handleNext();
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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { image: ["image/jpeg", "image/png"] }, // Specify that only image files are accepted
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
          className="cursor-pointer border border-gray-100 bg-gray-100 rounded-full aspect-ratio p-[20px] mt-[10px]"
        >
          <input {...getInputProps()} />
          {file ? (
            <div className="text-center rounded-2xl px-5 py-3">
              File: {file.name}
            </div>
          ) : (
            <div className="text-center rounded-2xl px-5 py-3">
              Click here or drag and drop a file to upload
            </div>
          )}
        </div>
      </div>
      {file && (
        <div className="text-center rounded-2xl flex items-center justify-center mb-5 px-5 py-3">
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded"
            className="w-50"
          />
        </div>
      )}
      <button
        onClick={handleLogo}
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

export default UploadLogo;
