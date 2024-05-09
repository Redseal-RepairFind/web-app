import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../../components/global/layout";
import Container from "../../../components/global/container";
import StepProgressBar from "../../../components/ui/progress-bar";
import TakePhoto from "./molecules/take-photo";
import ProfileDetails from "./molecules/profile-details";
import GstValidation from "./molecules/gst-validation";

const EmployeeUpdateInformation: React.FC = () => {
  const employee_session_step = sessionStorage.getItem("employee_session_step");

  // Check if employee_session_step is not null before parsing
  const parsedStep =
    employee_session_step !== null ? parseInt(employee_session_step) : null;

  const [stepIndex, setStepIndex] = useState<number>(parsedStep || 1);

  const handleNextStep = () => {
    setStepIndex(stepIndex + 1);
  };

  useEffect(() => {
    sessionStorage.setItem("employee_session_step", stepIndex.toString());
  }, [stepIndex]);

  const handlePrevStep = () => {
    setStepIndex(stepIndex - 1);
  };

  const steps = useMemo(
    () => [
      {
        id: 1,
        title: "Identity Verification",
        screen: (
          <TakePhoto handleNext={handleNextStep} handlePrev={handlePrevStep} />
        ),
      },
      {
        id: 2,
        title: "Profile Details",
        screen: (
          <ProfileDetails
            handleNext={handleNextStep}
            handlePrev={handlePrevStep}
          />
        ),
      },
    ],
    [stepIndex]
  );
  return (
    <Layout className={"bg-gray-100"}>
      <Container className="flex w-full items-center py-3 justify-center">
        <div className="flex-1 p-10 bg-white max-w-[800px]">
          <StepProgressBar steps={steps} stepIndex={stepIndex} />
          {steps[stepIndex].screen}
        </div>
      </Container>
    </Layout>
  );
};

export default EmployeeUpdateInformation;
