import React, { useState, useMemo } from "react";
import Layout from "../../../components/global/layout";
import Container from "../../../components/global/container";
import StepProgressBar from "../../../components/ui/progress-bar";
import TakePhoto from "./molecules/take-photo";
import ProfileDetails from "./molecules/profile-details";
import GstValidation from "./molecules/gst-validation";

const UpdateInformation: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);

  const handleNextStep = () => {
    setStepIndex(stepIndex + 1);
  };

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
        <div className="flex-1 p-10 bg-white max-w-[800px]">
          <StepProgressBar steps={steps} stepIndex={stepIndex} />
          {steps[stepIndex].screen}
        </div>
      </Container>
    </Layout>
  );
};

export default UpdateInformation;
