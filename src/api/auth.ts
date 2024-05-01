import createApiClient from "./api";

const client = createApiClient();

export const auth = {
  createAccount: (payload: any) =>
    client.post(`contractor/signup`, payload).then(({ data }: any) => data),

  verifyOtp: (payload: any) =>
    client
      .post(`contractor/email-verification`, payload)
      .then(({ data }: any) => data),
};
