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
};
