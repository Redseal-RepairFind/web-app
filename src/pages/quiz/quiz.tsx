import React, { useState, useMemo } from "react";
import Welcomequiz from "./pages/welcome-quiz";
import Instructions from "./pages/instructions";
import Questions from "./pages/questions";
import { useQuery } from "react-query";
import { auth } from "../../api/auth";

const Quiz = () => {
  const sessionIndex = JSON.parse(
    sessionStorage.getItem("sessionIndex") || "null"
  );

  const [screenIndex, setScreenIndex] = useState(sessionIndex || 0);

  const { data, isLoading } = useQuery(
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
        page: (
          <Questions
            data={data}
            isLoading={isLoading}
            handleIndex={handleIndex}
          />
        ),
      },
    ],
    [screenIndex, data]
  );

  return <React.Fragment>{screens[screenIndex].page}</React.Fragment>;
};

export default Quiz;