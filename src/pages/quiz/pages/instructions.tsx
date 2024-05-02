import React from "react";
import useLanguage from "../../../hooks/useLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

const Instructions = ({ handleIndex }: { handleIndex: any }) => {
  const { handleLanguageChoice } = useLanguage();
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="flex items-center justify-center max-w-[700px] p-5 gap-5 flex-col">
        <h1 className="text-xl font-semibold">Quiz Questions</h1>
        <div className="flex flex-col items-center justify-center mb-10">
          <span className="text-center text-gray-600">
            Please complete this short quiz to complete your onboarding to
            RepairFind.
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-md py-3 px-5 flex items-center gap-4">
          <div className="w-7 h-7 flex items-center justify-center rounded-full border border-black bg-black text-white">
            <FontAwesomeIcon icon={faQuestion} />
          </div>
          <div>
            <p className="text-lg font-semibold">
              10 {handleLanguageChoice("questions")}
            </p>
            <p className="text-gray-600">
              {handleLanguageChoice("question_info")}
            </p>
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-md py-3 px-5 flex items-center gap-4">
          <div className="w-7 h-7 flex items-center justify-center rounded-full border border-black bg-black text-white">
            <FontAwesomeIcon icon={faQuestion} />
          </div>
          <div>
            <p className="text-lg font-semibold">
              20 {handleLanguageChoice("minutes")}
            </p>
            <p className="text-gray-600">{handleLanguageChoice("time_info")}</p>
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-md py-3 px-5 flex items-center gap-4">
          <div className="w-7 h-7 flex items-center justify-center rounded-full border border-black bg-black text-white">
            <FontAwesomeIcon icon={faQuestion} />
          </div>
          <div>
            <p className="text-lg font-semibold">
              {handleLanguageChoice("get_certificate_badge")}
            </p>
            <p className="text-gray-600">
              {handleLanguageChoice("certificate_info")}
            </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-5 mt-10">
          <button
            onClick={() => handleIndex(0)}
            className="relative border w-full border-black py-3 rounded-md text-black"
          >
            {handleLanguageChoice("watch_video_again")}
          </button>
          <button
            onClick={() => handleIndex(2)}
            className="relative border w-full border-black bg-black py-3 rounded-md text-white"
          >
            {handleLanguageChoice("start_quiz")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
