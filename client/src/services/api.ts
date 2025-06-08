import axios from "axios";
import { getAuth } from "firebase/auth";

const api = axios.create({
    baseURL: "https://fennec-back-447938427814.northamerica-south1.run.app:8080",
    timeout: 50000,
});

// Request Interceptor
api.interceptors.request.use(
    async (config) => {
        // Skip token for auth endpoints
        const skipTokenUrls = ['/auth/signup', '/auth/login'];
        const shouldSkipToken = skipTokenUrls.some(url => config.url?.includes(url));
        if (!shouldSkipToken) {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const token = await user.getIdToken();
                config.headers.Authorization = `Bearer ${token}`;
            }
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

// Response Interceptor remains the same
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Response error: ", error);
        return Promise.reject(error);
    }
);

export default api;