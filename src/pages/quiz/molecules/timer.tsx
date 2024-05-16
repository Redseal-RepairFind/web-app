/* eslint-disable no-restricted-globals */
"use client";

import React, { useEffect, useCallback } from "react";
import useCountDown from "react-countdown-hook";
import Each from "../../../components/helpers/each";
import toast from "react-hot-toast";

const initialTime = 1200000;
const interval = 1000;

export default function Timer() {
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(
    initialTime,
    interval
  );

  useEffect(() => {
    start();
  }, []);

  // console.log(timeLeft);

  useEffect(() => {
    if (timeLeft === 1000) {
      toast.error("Your timer is up, kindly retake the assessment...");
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  }, [timeLeft]);

  const restart = useCallback(() => {
    const newTime = 42 * 1000;
    start(newTime);
  }, []);

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    if (!hours) return ` ${minutes}m : ${seconds}s`;

    return `${hours}h : ${minutes}m : ${seconds}s`;
  };

  const timeElements = formatTime(timeLeft).split(":");

  return (
    <div className="flex top-0 right-3 items-center gap-2 bg-slate-100 absolute px-5 py-3">
      <Each
        of={timeElements}
        render={(item: any, index: number) => (
          <span>
            <p
              className={`text-lg font-semibold ${
                item.includes("h") ? "text-black" : ""
              }`}
              key={index}
            >
              {item} {index + 1 !== timeElements.length && <span>:</span>}
            </p>
          </span>
        )}
      />
    </div>
  );
}
