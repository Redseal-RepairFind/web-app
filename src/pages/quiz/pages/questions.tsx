/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import useLanguage from "../../../hooks/useLanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import Timer from "../molecules/timer";
import toast from "react-hot-toast";
import CenteredModal from "../../../components/ui/centered-modal";
import Result from "../molecules/result";
import { useQuery } from "react-query";
import { auth } from "../../../api/auth";
import { SyncLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Questions = ({
  handleIndex,
  questions,
}: {
  handleIndex: any;
  questions: any;
}) => {
  const { data, isLoading } = useQuery(
    ["Quiz Data"],
    () => {
      return auth.getQuiz();
    },
    {
      cacheTime: 30000,
      staleTime: 30000,
      select: (data) => data?.data,
      refetchOnWindowFocus: false,
    }
  );

  const navigate = useNavigate();

  // console.log(data);

  const [questionIndex, setQuestionIndex] = useState<any>(0);

  // console.log(questions);

  const [totalScore, setTotalScore] = useState<any>(0);

  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  // console.log(data?.questions);

  const [answers, setAnswers] = useState<any>(
    data?.questions?.map((question: any) => ({
      ...question,
      selectedAnswer: null,
      isCorrect: false,
    })) || []
  );

  useEffect(() => {
    if (data) {
      setAnswers(
        data?.questions?.map((question: any) => ({
          ...question,
          selectedAnswer: null,
          isCorrect: false,
        }))
      );
    }
  }, [data, isLoading]);

  useEffect(() => {
    sessionStorage.setItem("question_session_index", questionIndex.toString());
    questionIndex > 0 &&
      sessionStorage.setItem("answers_session_index", JSON.stringify(answers));
  }, [questionIndex, answers]);

  // console.log(answers);

  const handleAnswer = (selectedAnswer: any) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = {
      ...updatedAnswers[questionIndex],
      selectedAnswer,
      isCorrect: selectedAnswer === updatedAnswers[questionIndex].answer[0],
    };
    setAnswers(updatedAnswers);
  };

  const handlePrevQuestion = () => {
    if (questionIndex !== 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  // console.log(answers);

  // console.log("total", totalScore);

  const handleNextQuestion = () => {
    if (questionIndex + 1 === data?.questions?.length) {
      const totalScore = answers.reduce(
        (acc: any, answer: any) => acc + (answer.isCorrect ? 1 : 0),
        0
      );
      toast.success("You have completed all questions!");
      setTotalScore(totalScore);
      handleModal();
      setTimeout(() => {
        if (totalScore >= 8) navigate("/account");
      }, 3000);
      return;
    }

    // Check if an answer is selected for the current question
    if (answers[questionIndex].selectedAnswer !== null) {
      setQuestionIndex(questionIndex + 1);
    } else {
      toast.remove();
      toast.error("Please select an answer before proceeding...");
    }
  };

  const { handleLanguageChoice } = useLanguage();
  if (isLoading)
    return (
      <div className=" flex items-center justify-center w-full h-[100vh]">
        <SyncLoader className="text-[#000000]" />
      </div>
    );

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <CenteredModal title="" open={modal} setOpen={handleModal}>
        <Result totalScore={totalScore} handleModal={handleModal} />
      </CenteredModal>
      <div className="relative max-w-[800px] w-full flex items-center justify-center flex-col gap-5">
        {answers && answers.length > 1 && (
          <>
            <Timer />
            <p className="bg-gray-100 py-4 px-5 rounded-md">
              Question {questionIndex + 1} of {answers?.length}
            </p>
            <h1 className="w-full text-3xl font-semibold text-start">
              {questionIndex + 1}. {answers[questionIndex]?.question}
            </h1>
            <div className="w-full my-5 p-5">
              {answers[questionIndex]?.options?.map((option: string) => (
                <label
                  key={option}
                  className={`w-full mb-2 bg-gray-100 rounded-md px-2 flex items-center gap-1 py-3 border-transparent border-b border-t text-[12px] duration-200 cursor-pointer`}
                >
                  <input
                    type="radio"
                    name={answers[questionIndex]?._id}
                    value={option}
                    onChange={() => handleAnswer(option)}
                    checked={answers[questionIndex]?.selectedAnswer === option}
                    className="accent-black"
                  />{" "}
                  {option}
                </label>
              ))}
            </div>
            <div className="flex items-center justify-between gap-2 w-full">
              <button
                disabled={questionIndex === 0}
                onClick={handlePrevQuestion}
                className={`relative border ${
                  questionIndex !== 0 ? "" : "cursor-not-allowed"
                } w-full border-black py-3 rounded-md text-black`}
              >
                Back
                <FontAwesomeIcon
                  className="absolute top-[50%] translate-y-[-50%] left-2.5"
                  icon={faArrowLeftLong}
                />
              </button>

              <button
                // disabled={questionIndex + 1 === questions.length}
                onClick={handleNextQuestion}
                className="relative border w-full border-black bg-black py-3 rounded-md text-white"
              >
                {questionIndex + 1 === data?.questions?.length
                  ? "Submit"
                  : `${handleLanguageChoice("next")}`}
                <FontAwesomeIcon
                  className="absolute top-[50%] translate-y-[-50%] right-2.5"
                  icon={faArrowRightLong}
                />
              </button>
            </div>
          </>
        )}
        {!answers && !isLoading && (
          <div className="flex items-center justify-center gap-2 flex-col">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="text-7xl mb-3"
            />
            <p className="text-2xl font-semibold text-center mb-5">
              No questions found, if error persists, kindly reach out to
              administrator...
            </p>
            <button
              // disabled={questionIndex + 1 === questions.length}
              onClick={() => location.reload()}
              className="relative border px-10 border-black bg-black py-3 rounded-md text-white"
            >
              Click to reload page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
