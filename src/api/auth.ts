import createApiClient from "./api";

const client = createApiClient();

export const auth = {
  login: (payload: any) =>
    client.post(`/contractor/signin`, payload).then(({ data }: any) => data),

  createAccount: (payload: any) =>
    client.post(`/contractor/signup`, payload).then(({ data }: any) => data),

  verifyOtp: (payload: any) =>
    client
      .post(`/contractor/email-verification`, payload)
      .then(({ data }: any) => data),

  updateProfile: (payload: any) =>
    client.post(`/contractor/profiles`, payload).then(({ data }: any) => data),

  createStripeIdentity: () =>
    client.post(`/contractor/me/stripe-identity`).then(({ data }: any) => data),

  updateGst: (payload: any) =>
    client.post(`/contractor/me/gst`, payload).then(({ data }: any) => data),

  getOtp: (payload: any) =>
    client
      .post(`/contractor/forgot-password`, payload)
      .then(({ data }: any) => data),

  verifyEmail: (payload: any) =>
    client
      .post(`/contractor/reset-password-verification`, payload)
      .then(({ data }: any) => data),

  resetPassword: (payload: any) =>
    client
      .post(`/contractor/reset-password`, payload)
      .then(({ data }: any) => data),
};
