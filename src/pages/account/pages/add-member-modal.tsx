import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useTeam from "../../../hooks/useTeam";
import toast from "react-hot-toast";
import { SyncLoader } from "react-spinners";
import Select from "react-select";

const AddMemberModal = ({ toggleModal }: { toggleModal: any }) => {
  const userString = sessionStorage.getItem("repairfind_user");
  const user = userString ? JSON.parse(userString) : null;

  const [selectedContractor, setSelectedContractor] = useState<any | null>(
    null
  );

  const { SendInvite, contractors, loadingContractors } = useTeam();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values: any) => {
    if (!selectedContractor) return toast.error("Please select a contractor");
    // console.log(values);
    toast.loading("Processing...");
    try {
      const data = await SendInvite({
        ...values,
        contractorId: selectedContractor?.value,
      });
      toast.remove();
      toast.success(data?.message);
      setTimeout(() => {
        toggleModal();
      }, 800);
    } catch (e: any) {
      console.log({ e });
      toast.remove();
      toast.error(e?.response?.data?.message);
    }
    // Perform actions with the form data, such as submitting to a backend
  };

  if (loadingContractors) {
    return (
      <div className=" flex items-center justify-center">
        <SyncLoader className="text-[#000000]" />
      </div>
    );
  }

  //   console.log(contractors);

  //   console.log(selectedContractor);

  const handleContractorChange = (selectedOption: any) => {
    setSelectedContractor(selectedOption);
  };

  return (
    <div className="h-[350px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-sm text-left w-full font-medium">Role</div>
        <input
          className="w-full mt-1 py-2 text-[12px] px-3 duration-200 focus:px-3.5 focus:border-black rounded-md border border-slate-300 outline-none focus:ring-0"
          type="text"
          id="role"
          {...register("role", { required: true })}
        />
        {errors.role && (
          <div className="text-red-500 text-xs font-medium w-full text-center">
            This field is required
          </div>
        )}
        <div className="text-sm text-left w-full font-medium mt-10 mb-1">
          Select Contractor
        </div>
        <Select
          value={selectedContractor}
          onChange={handleContractorChange}
          isMulti={false}
          options={contractors?.map((contractor: any) => {
            return { label: contractor?.name, value: contractor?._id };
          })}
        />

        <button
          disabled={isSubmitting}
          className="border border-black bg-black w-full mt-7 py-3 px-8 rounded-md text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddMemberModal;
