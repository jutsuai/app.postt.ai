import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const httpClient = (baseURL = API_URL) => {
  const token = localStorage.getItem("_auth_accessToken") as any;

  const instance = axios.create({
    baseURL,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      Authorization: `Bearer ${token}`,
    },
    // validateStatus: false,
  });

  return instance;
};

export default httpClient;
