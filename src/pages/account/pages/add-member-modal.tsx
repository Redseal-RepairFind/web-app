import React, { useState } from "react";
import useTeam from "../../../hooks/useTeam";
import toast from "react-hot-toast";
import { SyncLoader } from "react-spinners";
import Search from "../../../components/ui/search";

const AddMemberModal = ({ toggleModal }: { toggleModal: any }) => {
  const userString = sessionStorage.getItem("repairfind_user");
  const user = userString ? JSON.parse(userString) : null;

  const [selectedContractor, setSelectedContractor] = useState<any | null>(
    null
  );

  const { SendInvite, contractors, loadingContractors, setSearchContractor } =
    useTeam();

  const onSubmit = async () => {
    if (!selectedContractor) return toast.error("Please select a contractor");
    // console.log(values);
    toast.loading("Processing...");
    try {
      const data = await SendInvite({
        contractorId: selectedContractor?._id,
      });
      toast.remove();
      toast.success(data?.message);
      setTimeout(() => {
        toggleModal();
      }, 1000);
    } catch (e: any) {
      console.log({ e });
      toast.remove();
      toast.error(e?.response?.data?.message);
    }
    // Perform actions with the form data, such as submitting to a backend
  };

  //   console.log(contractors);

  console.log(selectedContractor);

  const handleContractorChange = (selectedOption: any) => {
    setSelectedContractor(selectedOption);
  };

  return (
    <div className="max-h-[350px] md:max-h-[500px]">
      <Search
        resetValue={() => setSelectedContractor(null)}
        setSearch={setSearchContractor}
        placeholder="Search for contractors..."
      />
      {loadingContractors ? (
        <div className="h-[200px] md:h-[350px] flex items-center justify-center">
          <SyncLoader className="text-[#000000]" />
        </div>
      ) : (
        <div className="max-h-[200px] mt-2 md:max-h-[350px] w-full border border-gray-300 rounded-md p-3 overflow-y-scroll">
          {contractors?.map((contractor: any) => (
            <div
              onClick={() => handleContractorChange(contractor)}
              className={`w-full flex items-center justify-start gap-2 border ${
                contractor?.id === selectedContractor?.id
                  ? "bg-gray-100 border-gray-200"
                  : "bg-transparent border-gray-200"
              }shadow rounded-md mb-3 p-3 cursor-pointer`}
            >
              <div className="w-12 flex items-center overflow-hidden justify-center h-12 rounded-full border border-gray-100 shadow">
                <img
                  className="w-full rounded-full"
                  src={contractor?.profilePhoto?.url}
                  alt={""}
                />
              </div>
              <div className="flex flex-col items-start gap-1">
                <p className="font-medium">{contractor?.email}</p>
                <p className="text-gray-600">{contractor?.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={onSubmit}
        disabled={!selectedContractor?._id}
        className={`border  ${
          selectedContractor?._id
            ? "border-black bg-black text-white cursor-pointer"
            : "border-gray-300  bg-gray-300 text-black cursor-not-allowed"
        } w-full mt-7 py-3 px-8 rounded-md `}
      >
        Invite a Staff to Join Your Team
      </button>
    </div>
  );
};

export default AddMemberModal;
