import React from "react";
import useLanguage from "../../..//hooks/useLanguage";

const Welcomequiz = ({ handleIndex, url }: { handleIndex: any; url: any }) => {
  const { handleLanguageChoice } = useLanguage();

  // console.log(url);
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="flex items-center justify-center max-w-[700px] p-5 gap-5 flex-col">
        <h1 className="text-xl font-semibold">
          {handleLanguageChoice("welcome_msg")}
        </h1>
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-medium">
            {handleLanguageChoice("hi_there")}
          </p>
          <span className="text-center text-gray-600">
            {handleLanguageChoice("video_subhead")}
          </span>
        </div>
        <video
          className="border border-gray-300 rounded-md"
          controls
          width="1000"
          height="700"
        >
          <source
            src={
              url ??
              "https://contractorapp.s3.eu-west-3.amazonaws.com/y2mate.com+-+RepairFind_480p.mp4"
            }
            type="video/mp4"
          />
          {handleLanguageChoice("browser_support_tag")}
        </video>
        <button
          onClick={() => handleIndex(1)}
          className="relative border max-w-[200px] w-full border-black bg-black py-3 rounded-md text-white"
        >
          {handleLanguageChoice("continue")}
        </button>
      </div>
    </div>
  );
};

export default Welcomequiz;
