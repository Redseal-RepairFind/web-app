import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./sidebar";

const Stickybar = ({ toggleSticky }: { toggleSticky: any }) => {
  const userString = sessionStorage.getItem("repairfind_user");
  const user = userString ? JSON.parse(userString) : null;

  console.log(user);
  return (
    <div className="flex-1 p-2 border-l border-gray-100 shadow bg-white z-10 left-0 h-[100vh] w-[70%] absolute">
      <button
        className="w-full flex items-center justify-start p-3"
        onClick={toggleSticky}
      >
        <FontAwesomeIcon icon={faX} className="text-sm text-gray-600" />
      </button>
      <Sidebar className={"w-full"} />
    </div>
  );
};

export default Stickybar;
