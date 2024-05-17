import { useState } from "react";
import { team } from "../api/team";
import { useQuery, useMutation } from "react-query";

const useTeam = () => {
  const userString = sessionStorage.getItem("repairfind_user");
  const user = userString ? JSON.parse(userString) : null;

  const [searchContractor, setSearchContractor] = useState<string>("");

  const { data, isLoading } = useQuery(
    ["Team"],
    () => {
      return user?.accountType.toLowerCase() === "company" && team.getTeam();
    },
    {
      cacheTime: 30000,
      staleTime: 30000,
      select: (data) => data?.data,
    }
  );

  const { data: teamData, isLoading: loadingTeamData } = useQuery(
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

  const { data: contractors, isLoading: loadingContractors } = useQuery(
    ["Contractors", { searchContractor }],
    () => {
      return (
        user?.accountType.toLowerCase() === "company" &&
        team.searchContractors({ email: searchContractor })
      );
    },
    {
      cacheTime: 30000,
      staleTime: 30000,
      select: (data) => data?.data,
    }
  );

  const { mutateAsync: SendInvite } = useMutation(team.sendInvite);
  const { mutateAsync: AcceptReject } = useMutation(team.acceptRejectInvite);
  const { mutateAsync: LeaveTeam } = useMutation(team.leaveTeam);
  const { mutateAsync: RemoveMember } = useMutation(team.removeTeamMember);

  return {
    data,
    isLoading,
    contractors,
    loadingContractors,
    SendInvite,
    setSearchContractor,
    teamData,
    loadingTeamData,
    invites,
    loadingInvites,
    AcceptReject,
    LeaveTeam,
    RemoveMember,
  };
};

export default useTeam;
