import axios from "axios";
import { getAuth } from "firebase/auth";

const api = axios.create({
  baseURL: "https://api-url.com", // El backend
  timeout: 5000,
});

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers.accept = "application/json";
    console.log("Making request to: ", config.url);
    return config;
  },
  (error) => {
    console.error("Request error: ", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response error: ", error);
    return Promise.reject(error);
  }
);

export default api;