import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const StepProgressBar = () => {
  return (
    <ProgressBar stepPositions={4} percent={50} filledBackground="#000000">
      <Step transition="scale">
        {({ accomplished, index }: { accomplished: any; index: number }) => (
          <div
            className={`w-8 relative h-8 flex items-center justify-center rounded-full border ${
              accomplished
                ? "border-black bg-black"
                : "border-gray-300 bg-gray-300"
            }`}
          >
            <p
              className={`text-xs ${
                accomplished ? "text-white" : "text-black"
              }`}
            >
              {index + 1}
            </p>
            <p className="absolute text-center bottom-[-40px] text-xs text-black">
              Current Step
            </p>
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }: { accomplished: any; index: number }) => (
          <div
            className={`w-8 relative h-8 flex items-center justify-center rounded-full border ${
              accomplished
                ? "border-black bg-black"
                : "border-gray-300 bg-gray-300"
            }`}
          >
            <p
              className={`text-xs ${
                accomplished ? "text-white" : "text-black"
              }`}
            >
              {index + 1}
            </p>
            <p className="absolute text-center bottom-[-40px] text-xs text-black">
              Current Step
            </p>
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }: { accomplished: any; index: number }) => (
          <div
            className={`w-8 relative h-8 flex items-center justify-center rounded-full border ${
              accomplished
                ? "border-black bg-black"
                : "border-gray-300 bg-gray-300"
            }`}
          >
            <p
              className={`text-xs ${
                accomplished ? "text-white" : "text-black"
              }`}
            >
              {index + 1}
            </p>
            <p className="absolute text-center bottom-[-40px] text-xs text-black">
              Current Step
            </p>
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};

export default StepProgressBar;
