import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const StepItem = ({
  accomplished,
  index,
  stepIndex,
  item,
}: {
  accomplished: any;
  index: number;
  stepIndex: number;
  item?: any;
}) => {
  return (
    <div
      className={`w-8 relative h-8 flex items-center justify-center rounded-full border ${
        accomplished ? "border-black bg-black" : "border-gray-300 bg-gray-300"
      }`}
    >
      <p className={`text-xs ${accomplished ? "text-white" : "text-black"}`}>
        {accomplished && stepIndex > index ? (
          <FontAwesomeIcon icon={faCheck} />
        ) : (
          index + 1
        )}
      </p>
      <div className="absolute top-[40px] min-w-[70px]">
        <p className="text-wrap text-center text-xs text-black">{item.title}</p>
      </div>
    </div>
  );
};

export default StepItem;
