import React, { useState } from "react";
import useTeam from "../../../hooks/useTeam";
import { SyncLoader } from "react-spinners";
import CenteredModal from "../../../components/ui/centered-modal";
import AddTeamMember from "./add-member-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const TeamMembers = () => {
  const { data, isLoading } = useTeam();

  const [showModal, hideModal] = useState<boolean>(false);

  console.log(data, isLoading);

  const toggleModal = () => {
    hideModal(!showModal);
  };

  if (isLoading) {
    return (
      <div className=" flex items-center justify-center w-full h-[100vh]">
        <SyncLoader className="text-[#000000]" />
      </div>
    );
  }

  return (
    <React.Fragment>
      <CenteredModal open={showModal} setOpen={hideModal} title="">
        <AddTeamMember toggleModal={toggleModal} />
      </CenteredModal>
      <div className="w-full max-w-[600px] flex items-start justify-start flex-col gap-4">
        {/* {data?.members?.length && */}
        <div className="w-full">
          {/* <div className="relative mt-1">
            <FontAwesomeIcon
              className="text-sm text-gray-600 absolute right-3 top-[50%] translate-y-[-50%]"
              icon={faSearch}
            />
            <input
              placeholder="Search for contractors..."
              className={`w-full py-3 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-gray-100 bg-gray-100 focus:bg-white outline-none focus:ring-0`}
              type="search"
            />
          </div> */}
        </div>
        {/* // } */}
        <button
          onClick={toggleModal}
          className="border border-black bg-black w-full py-3 px-8 rounded-md text-white"
        >
          Add Team Member
        </button>
      </div>
    </React.Fragment>
  );
};

export default TeamMembers;
