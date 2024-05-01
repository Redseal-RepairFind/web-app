import React from "react";
import Layout from "../../../components/global/layout";
import Container from "../../../components/global/container";
import StepProgressBar from "../../../components/ui/progress-bar";

const UpdateInformation = () => {
  return (
    <Layout className={"bg-gray-100"}>
      <Container className="flex w-full items-center py-3 sm:min-h-[77.4vh] min-h-[64.2vh] justify-center">
        <div className="flex-1 p-10 bg-white max-w-[750px]">
          <StepProgressBar />
        </div>
      </Container>
    </Layout>
  );
};

export default UpdateInformation;
