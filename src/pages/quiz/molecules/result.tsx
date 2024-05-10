/* eslint-disable no-restricted-globals */
import React from "react";
import success from "./success.png";
import error from "./error.png";
import useLanguage from "../../../hooks/useLanguage";
import { useNavigate } from "react-router-dom";

const Result = ({ handleModal, totalScore, profile }: any) => {
  const { handleLanguageChoice } = useLanguage();

  const navigate = useNavigate();

  console.log(profile);

  //   console.log(totalScore);

  const handlePage = () => {
    if (totalScore < 8) {
      handleModal();
      sessionStorage.removeItem("question_session_index");
      sessionStorage.removeItem("answers_session_index");
      return location.reload();
    }
    navigate("/account");
    sessionStorage.removeItem("question_session_index");
    sessionStorage.removeItem("sessionIndex");
    sessionStorage.removeItem("answers_session_index");
  };
  return (
    <div className="bg-white flex flex-col items-center gap-5 justify-center">
      <p className="font-medium text-sm">
        {handleLanguageChoice("score")}: {totalScore}/10
      </p>
      <img
        className="w-24"
        src={totalScore >= 8 ? success : error}
        alt="Pass"
      />

      <h1 className="text-2xl font-semibold">
        {totalScore >= 8
          ? handleLanguageChoice("congratulations")
          : handleLanguageChoice("oops")}
      </h1>
      <p className="text-gray-600">
        {totalScore >= 8
          ? handleLanguageChoice("congrat_info")
          : handleLanguageChoice("oops_info")}
      </p>
      <button
        onClick={handlePage}
        className="border border-black bg-black py-3 px-8 rounded-md text-white"
      >
        {totalScore >= 8
          ? handleLanguageChoice("continue_to_app")
          : handleLanguageChoice("try_again")}
      </button>
    </div>
  );
};

export default Result;
