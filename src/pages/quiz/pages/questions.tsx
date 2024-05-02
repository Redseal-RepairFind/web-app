import React, { useState } from "react";
import useLanguage from "../../../hooks/useLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import Timer from "../molecules/timer";
const Questions = ({
  handleIndex,
  questions,
}: {
  handleIndex: any;
  questions: any;
}) => {
  console.log(questions);

  const [questionIndex, setQuestionIndex] = useState(0);

  const { handleLanguageChoice } = useLanguage();

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="relative max-w-[800px] w-full flex items-center justify-center flex-col gap-5">
        <Timer />
        <p className="bg-gray-100 py-4 px-5 rounded-md">
          Question {questionIndex + 1} of {questions.length}
        </p>
        <h1 className="w-full text-3xl font-semibold text-start">
          {questionIndex + 1}. {questions[questionIndex]?.question}
        </h1>
        <div className="w-full my-5 p-5">
          {questions[questionIndex]?.options?.map((option: string) => (
            <label
              className={`w-full mb-2 bg-gray-100 rounded-md px-2 flex items-center gap-1 py-3 border-transparent border-b border-t text-[12px] duration-200 cursor-pointer
      `}
            >
              <input type="radio" className="accent-black" /> {option}
            </label>
          ))}
        </div>
        <button
          onClick={() => setQuestionIndex(questionIndex + 1)}
          className="relative border w-full border-black bg-black py-3 rounded-md text-white"
        >
          {handleLanguageChoice("next")}
          <FontAwesomeIcon
            className="absolute top-[50%] translate-y-[-50%] right-2.5"
            icon={faArrowRightLong}
          />
        </button>
      </div>
    </div>
  );
};

export default Questions;
