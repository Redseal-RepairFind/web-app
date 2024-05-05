import createApiClient from "./api";

const client = createApiClient();

export const team = {
  getTeam: () => client.get(`/contractor/teams`).then(({ data }: any) => data),

  sendInvite: (payload: any) =>
    client
      .post(`/contractor/teams/invitations`, payload)
      .then(({ data }: any) => data),

  searchContractors: () =>
    client
      .get("/contractor/teams/search-contractors")
      .then(({ data }: any) => data),
};
