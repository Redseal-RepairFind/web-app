import React, { useState, useMemo } from "react";
import Welcomequiz from "./pages/welcome-quiz";
import Instructions from "./pages/instructions";
import Questions from "./pages/questions";
import { useQuery } from "react-query";
import { auth } from "../../api/auth";

const Quiz = () => {
  const [screenIndex, setScreenIndex] = useState(0);

  const { data } = useQuery(
    ["Quiz"],
    () => {
      return auth.getQuiz();
    },
    { cacheTime: 30000, staleTime: 30000, select: (data) => data?.data }
  );

  console.log(data);

  const handleIndex = (number: number) => {
    setScreenIndex(number);
  };

  console.log(screenIndex);

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
          <Questions questions={data?.questions} handleIndex={handleIndex} />
        ),
      },
    ],
    [screenIndex, data]
  );

  return <React.Fragment>{screens[screenIndex].page}</React.Fragment>;
};

export default Quiz;
