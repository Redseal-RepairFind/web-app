import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useQuery } from "react-query";
import { auth } from "../../api/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Welcomequiz from "./pages/welcome-quiz";
import Instructions from "./pages/instructions";
import Questions from "./pages/questions";
import DirectQuestions from "./pages/direct-questions";
import CompletedQuiz from "./pages/completed-quiz";

const DirectQuiz = () => {
  const sessionIndex = JSON.parse(
    sessionStorage.getItem("sessionIndex") || "null"
  );

  const [screenIndex, setScreenIndex] = useState(sessionIndex || 0);

  const handleIndex = (number: number) => {
    setScreenIndex(number);
    sessionStorage.setItem("sessionIndex", JSON.stringify(number));
  };

  const { token } = useParams();

  console.log(token);

  const { data, isLoading, isError } = useQuery(
    ["Direct Quiz"],
    () => {
      return auth.getDirectQuiz(token);
    },
    {
      cacheTime: 30000,
      staleTime: 30000,
      select: (data) => data?.data,
      refetchOnWindowFocus: false,
    }
  );

  console.log(data);

  if (isLoading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <BarLoader color="#000" />
      </div>
    );

  if (isError)
    return (
      <div className="h-screen w-full flex items-center justify-center flex-col gap-2">
        <FontAwesomeIcon icon={faExclamationCircle} />
        <p>
          Unable to load questions, please reload the page or contact site
          admin...
        </p>
      </div>
    );

  return (
    <div className="h-screen w-full flex items-center justify-center">
      {screenIndex === 0 && (
        <Welcomequiz url={data?.video_url} handleIndex={handleIndex} />
      )}
      {screenIndex === 1 && (
        <Instructions
          questionLength={data?.questions?.length}
          handleIndex={handleIndex}
        />
      )}
      {screenIndex === 2 && (
        <DirectQuestions
          id={data?._id}
          questions={data?.questions}
          handleIndex={handleIndex}
        />
      )}
      {screenIndex === 3 && <CompletedQuiz />}
    </div>
  );
};

export default DirectQuiz;
