import axios from "axios";
import url from "../url";
import toast from "react-hot-toast";

const createApiClient = () => {
  const client = axios.create({
    baseURL: url,
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  client.interceptors.request.use(
    async (config: any) => {
      const token = sessionStorage.getItem("userToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: any) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (error.response.status === 401 && error.config.url !== "/login") {
        toast.remove();
        toast.error("Unauthenticated, kindly login again...");
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export default createApiClient;
