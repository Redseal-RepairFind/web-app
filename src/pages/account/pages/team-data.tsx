/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { useQuery } from "react-query";
import { team } from "../../../api/team";
import { SyncLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import CenteredModal from "../../../components/ui/centered-modal";
import ViewInvites from "./view-invites";
import toast from "react-hot-toast";
import useTeam from "../../../hooks/useTeam";
import { convertDate } from "../../../utils";
import useLanguage from "../../../hooks/useLanguage";

const TeamData = () => {
  const { AcceptReject } = useTeam();

  const { handleLanguageChoice } = useLanguage();

  const { data: teamData, isLoading } = useQuery(
    ["Team Data"],
    () => {
      return team.getTeamInfo();
    },
    {
      cacheTime: 30000,
      staleTime: 30000,
      select: (data) => data?.data,
    }
  );

  const [showModal, hideModal] = useState<boolean>(false);

  const toggleModal = () => {
    hideModal(!showModal);
  };

  const { data: invites, isLoading: loadingInvites } = useQuery(
    ["Invites"],
    () => {
      return team.getInvites();
    },
    {
      cacheTime: 30000,
      staleTime: 30000,
      select: (data) => data?.data,
    }
  );

  //   console.log(teamData);
  //   console.log(invites);

  const onSubmit = async ({ type, id }: { type: string; id: string }) => {
    // console.log(values);
    toast.loading("Processing...");
    try {
      const data = await AcceptReject({
        type,
        id,
      });
      toast.remove();
      toast.success(data?.message);
      setTimeout(() => {
        toggleModal();
        location.reload();
      }, 1000);
    } catch (e: any) {
      console.log({ e });
      toast.remove();
      toast.error(e?.response?.data?.message);
    }
  };

  if (isLoading) {
    return (
      <div className=" flex items-center justify-center">
        <SyncLoader className="text-[#000000]" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 flex-col w-full">
      <CenteredModal open={showModal} setOpen={toggleModal} title={""}>
        <ViewInvites
          invites={invites}
          loadingInvites={loadingInvites}
          toggleModal={toggleModal}
        />
      </CenteredModal>
      {teamData?.length ? (
        <>
          {teamData?.map((team: any) => (
            <div
              className={`w-full max-w-[500px] flex-col md:flex-row flex items-center gap-5 md:gap-2 justify-between border bg-white border-gray-200 shadow rounded-md mb-3 p-5`}
            >
              <div className="w-12 flex items-center justify-center h-12 rounded-full border border-gray-100 shadow">
                <img
                  className="w-7"
                  src={team?.contractor?.profilePhoto?.url}
                  alt={""}
                />
              </div>
              <div>
                <p className="font-semibold text-base text-center">
                  {handleLanguageChoice("companyname")}
                </p>
                <p className="font-medium text-sm text-center">
                  {team?.contractor?.name}
                </p>
              </div>
              <div>
                <p className="font-semibold text-base text-center">
                  Date Joined
                </p>
                <p className="font-medium text-sm text-center">
                  {convertDate({
                    isoDate: team?.dateJoined,
                    dateStyle: "short",
                  })}
                </p>
              </div>
              <button className="flex items-center justify-end gap-2">
                <FontAwesomeIcon icon={faRightFromBracket} />
                {handleLanguageChoice("exit")}
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
            You don't belong to a team yet...
          </p>
        </>
      )}

      <button
        onClick={() => {
          if (!invites?.length)
            return toast.error("You currently have no invites...");
          toggleModal();
        }}
        className="border border-black bg-black py-3 px-8 rounded-md text-white"
      >
        View Invites {`(${invites?.length})`}
      </button>
    </div>
  );
};

export default TeamData;
