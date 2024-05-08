import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../../components/global/layout";
import Container from "../../../components/global/container";
import StepProgressBar from "../../../components/ui/progress-bar";
import TakePhoto from "./molecules/take-photo";
import ProfileDetails from "./molecules/profile-details";
import GstValidation from "./molecules/gst-validation";

const IndividualUpdate: React.FC = () => {
  const individual_session_step = sessionStorage.getItem(
    "individual_session_step"
  );

  // Check if individual_session_step is not null before parsing
  const parsedStep =
    individual_session_step !== null ? parseInt(individual_session_step) : null;

  const [stepIndex, setStepIndex] = useState<number>(parsedStep || 0);

  const handleNextStep = () => {
    setStepIndex(stepIndex + 1);
  };

  useEffect(() => {
    sessionStorage.setItem("individual_session_step", stepIndex.toString());
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
      {
        id: 3,
        title: "GST/HST Validation",
        screen: <GstValidation handlePrev={handlePrevStep} />,
      },
    ],
    [stepIndex]
  );
  return (
    <Layout className={"bg-gray-100"}>
      <Container className="flex w-full items-center py-3 sm:min-h-[77.4vh] min-h-[64.2vh] justify-center">
        <div className="flex-1 p-5 md:p-10 bg-white max-w-[800px]">
          <div className="px-5 w-full">
            <StepProgressBar steps={steps} stepIndex={stepIndex} />
          </div>
          {steps[stepIndex].screen}
        </div>
      </Container>
    </Layout>
  );
};

export default IndividualUpdate;
