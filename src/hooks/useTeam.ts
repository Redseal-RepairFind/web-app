import { useState } from "react";
import { team } from "../api/team";
import { useQuery, useMutation } from "react-query";

const useTeam = () => {
  const [searchContractor, setSearchContractor] = useState<string>("");

  const { data, isLoading } = useQuery(
    ["Team"],
    () => {
      return team.getTeam();
    },
    {
      cacheTime: 30000,
      staleTime: 30000,
      select: (data) => data?.data,
    }
  );

  const { data: contractors, isLoading: loadingContractors } = useQuery(
    ["Contractors", { searchContractor }],
    () => {
      return team.searchContractors({ email: searchContractor });
    },
    {
      cacheTime: 30000,
      staleTime: 30000,
      select: (data) => data?.data,
    }
  );

  const { mutateAsync: SendInvite } = useMutation(team.sendInvite);

  return {
    data,
    isLoading,
    contractors,
    loadingContractors,
    SendInvite,
    setSearchContractor,
  };
};

export default useTeam;
