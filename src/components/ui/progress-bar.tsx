import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import StepItem from "./progress-step-item";
import Each from "../helpers/each";

const StepProgressBar = ({
  steps,
  stepIndex,
}: {
  steps: any[];
  stepIndex: number;
}) => {
  const percent = (stepIndex / (steps.length - 1)) * 100;

  const positions = steps.map((step, index) => {
    return (index / (steps.length - 1)) * 100;
  });

  //   console.log(positions);

  //   console.log(percent);
  return (
    <div className="w-full p-4">
      <ProgressBar
        height={2}
        stepPositions={positions}
        percent={percent}
        filledBackground="#000000"
      >
        {steps.map((step) => (
          <Step key={step.id} transition="scale">
            {({
              accomplished,
              index,
            }: {
              accomplished: any;
              index: number;
            }) => (
              <StepItem
                item={step}
                stepIndex={stepIndex}
                accomplished={accomplished}
                index={index}
              />
            )}
          </Step>
        ))}
      </ProgressBar>
    </div>
  );
};

export default StepProgressBar;
