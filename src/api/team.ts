import createApiClient from "./api";

const client = createApiClient();

export const team = {
  getTeam: () => client.get(`/contractor/teams`).then(({ data }: any) => data),

  sendInvite: (payload: any) =>
    client
      .post(`/contractor/teams/invitations`, payload)
      .then(({ data }: any) => data),

  searchContractors: ({ email, name }: { email?: string; name?: string }) =>
    client
      .get(`/contractor/teams/search-contractors?email=${email}`)
      .then(({ data }: any) => data),

  getTeamInfo: () =>
    client.get(`/contractor/teams/memberships`).then(({ data }: any) => data),

  getInvites: () =>
    client.get(`/contractor/teams/invitations`).then(({ data }: any) => data),

  acceptRejectInvite: ({ type, id }: { type: any; id: string }) =>
    client
      .patch(`/contractor/teams/invitations/${id}/${type}`)
      .then(({ data }: any) => data),
};
