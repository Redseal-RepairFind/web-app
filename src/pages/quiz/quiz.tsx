import React, { useState, useMemo } from "react";
import Welcomequiz from "./pages/welcome-quiz";
import Instructions from "./pages/instructions";
import Questions from "./pages/questions";
import { useQuery } from "react-query";
import { auth } from "../../api/auth";
import welcome from "../../images/welcome.png";
import { Link } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";

const Quiz = () => {
  const sessionIndex = JSON.parse(
    sessionStorage.getItem("sessionIndex") || "null"
  );

  const [screenIndex, setScreenIndex] = useState(sessionIndex || 0);

  const userString = sessionStorage.getItem("repairfind_user");
  const user = userString ? JSON.parse(userString) : null;

  const { handleLanguageChoice } = useLanguage();

  const { data } = useQuery(
    ["Quiz"],
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

  // console.log(data);

  const handleIndex = (number: number) => {
    setScreenIndex(number);
    sessionStorage.setItem("sessionIndex", JSON.stringify(number));
  };

  // console.log(screenIndex);

  const screens = useMemo(
    () => [
      {
        id: 1,
        page: <Welcomequiz url={data?.video_url} handleIndex={handleIndex} />,
      },
      { id: 2, page: <Instructions handleIndex={handleIndex} /> },
      {
        id: 3,
        page: <Questions handleIndex={handleIndex} />,
      },
    ],
    [screenIndex, data]
  );

  if (user?.onboarding?.hasPassedQuiz) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center flex-col gap-5 p-5">
        <img
          src={welcome}
          className="w-[90%] md:w-[40%] h-auto mb-10"
          alt="Welcome"
        />
        <p className="text-sm text-gray-500 font-medium text-center mt-1 md:max-w-[400px]">
          {handleLanguageChoice("completed_quiz")}
        </p>
        <Link
          className="px-8 py-3 mt-2 rounded-md bg-black text-white "
          to={`/account`}
        >
          {handleLanguageChoice("login")}
        </Link>
      </div>
    );
  }

  return <React.Fragment>{screens[screenIndex].page}</React.Fragment>;
};

export default Quiz;
