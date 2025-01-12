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

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      // Check if success is false in response data
      if (response.status === 200 && response.data?.success === false) {
        // Throw an error with the message from the response
        throw new Error(JSON.stringify(response.data) || "An error occurred.");
      }
      return response;
    },
    (error) => {
      // Handle any other errors (like network issues or non-200 responses)
      return Promise.reject(error);
    },
  );

  return instance;
};

export default httpClient;
