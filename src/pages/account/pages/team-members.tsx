import React, { useState } from "react";
import useTeam from "../../../hooks/useTeam";
import { SyncLoader } from "react-spinners";
import CenteredModal from "../../../components/ui/centered-modal";
import AddTeamMember from "./add-member-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faRightFromBracket,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import Search from "../../../components/ui/search";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

const TeamMembers = () => {
  const { data, isLoading } = useTeam();

  const [selectedContractor, setSelectedContractor] = useState<any | null>(
    null
  );

  const [showModal, hideModal] = useState<boolean>(false);
  const [searchContractor, setSearchContractor] = useState<string>("");

  // console.log(data, isLoading);

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
      <div className="w-full  max-w-[600px] flex items-center justify-center flex-col gap-4">
        <Search
          resetValue={() => setSelectedContractor(null)}
          setSearch={setSearchContractor}
          placeholder="Search for contractors..."
        />
        <div className="max-h-[200px] mt-2 md:max-h-[350px] w-full border border-gray-300 rounded-md px-3 pt-3 overflow-y-scroll">
          {data?.members?.length ? (
            <>
              {data?.members?.map((member: any) => (
                <div
                  className={`w-full relative flex-col md:flex-row flex items-center gap-5 md:gap-2 justify-between border bg-white border-gray-200 shadow rounded-md mb-3 p-5`}
                >
                  <div className="flex items-center flex-col md:flex-row justify-start gap-4">
                    <div className="w-12 flex items-center justify-center h-12 rounded-full border border-gray-100 shadow">
                      <img
                        className="w-7"
                        src={member?.profilePhoto?.url}
                        alt={""}
                      />
                    </div>
                    <div className="relative">
                      {member?.status?.toLowerCase() === "pending" && (
                        <span className="md:absolute inline top-0 font-medium right-[-70px] text-center bg-pink-300 py-1 px-3 text-[12px]">
                          Pending
                        </span>
                      )}
                      <p className="font-semibold text-base">{member?.email}</p>
                      <p className="text-sm font-medium text-gray-500">
                        {member?.name}
                      </p>
                    </div>
                  </div>
                  <button className="absolute md:inline top-5 right-5">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>
                </div>
              ))}
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="text-5xl text-black"
              />
              <p className="text-gray-500 font-semibold">
                No team members have been added yet...
              </p>
            </>
          )}
        </div>
        <button
          onClick={toggleModal}
          className="border border-black bg-black py-3 px-8 rounded-md text-white"
        >
          Add Team Member
        </button>
      </div>
    </React.Fragment>
  );
};

export default TeamMembers;
