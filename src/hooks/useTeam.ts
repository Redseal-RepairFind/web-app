import { team } from "../api/team";
import { useQuery, useMutation } from "react-query";

const useTeam = () => {
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
    ["Contractos"],
    () => {
      return team.searchContractors();
    },
    {
      cacheTime: 30000,
      staleTime: 30000,
      select: (data) => data?.data,
    }
  );

  const { mutateAsync: SendInvite } = useMutation(team.sendInvite);

  return { data, isLoading, contractors, loadingContractors, SendInvite };
};

export default useTeam;
