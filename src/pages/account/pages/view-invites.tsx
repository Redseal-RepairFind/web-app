/* eslint-disable no-restricted-globals */
import React from "react";
import useTeam from "../../../hooks/useTeam";
import toast from "react-hot-toast";
import { SyncLoader } from "react-spinners";

const ViewInvites = ({
  toggleModal,
  invites,
  loadingInvites,
}: {
  toggleModal: any;
  invites: any[];
  loadingInvites: boolean;
}) => {
  //   const userString = sessionStorage.getItem("repairfind_user");
  //   const user = userString ? JSON.parse(userString) : null;

  const { AcceptReject } = useTeam();

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

  return (
    <div className="max-h-[350px] md:max-h-[500px]">
      {loadingInvites ? (
        <div className="h-[200px] md:h-[350px] flex items-center justify-center">
          <SyncLoader className="text-[#000000]" />
        </div>
      ) : (
        <div className="max-h-[200px] my-2 md:max-h-[350px] w-full border border-gray-300 rounded-md p-5 overflow-y-scroll">
          {invites?.map((invite: any) => (
            <div
              className={`w-full border bg-white border-gray-200 shadow rounded-md mb-3 p-5`}
            >
              <p className="font-medium">
                {invite?.name} invited you to join their team
              </p>
              <div className="flex w-full mt-7 flex-col md:flex-row items-center justify-between gap-2">
                <button
                  onClick={() => onSubmit({ type: "reject", id: invite?.id })}
                  className={`border border-black text-black w-full py-2 flex-1 rounded-md `}
                >
                  Decline
                </button>
                <button
                  onClick={() => onSubmit({ type: "accept", id: invite?.id })}
                  className={`border border-black bg-black text-white w-full py-2 flex-1 rounded-md `}
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewInvites;
