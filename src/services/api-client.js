import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://dream-d-well-backend.vercel.app/api",
});
apiClient.interceptors.request.use(
    (config) => {
        const tokens = localStorage.getItem("authTokens");
        if (tokens) {
            const { access } = JSON.parse(tokens);
            if (access) {
                config.headers.Authorization = `JWT ${access}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Centralized error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access (e.g., token expired)
            // Optional: localStorage.removeItem("authTokens"); window.location.href = "/login";
            console.warn("Unauthorized access - 401");
        }
        return Promise.reject(error);
    }
);

export default apiClient;