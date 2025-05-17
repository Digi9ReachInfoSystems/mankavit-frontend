import axios from "axios";
import decryptData from "../utils/decryptionService";
import encryptData from "../utils/encryptionService";
import { updateAccessToken } from "../api/authApi";
import { getCookiesData } from "../utils/cookiesService";

// Create an Axios instance with the base URL and common configurations
const api = axios.create({
      baseURL: "https://mankavith-backend.vercel.app", // Replace with your backend base URL
    // baseURL: "http://localhost:5000/",     //

    timeout: 30000, // Optional: Timeout after 10 seconds
    headers: {
        "Content-Type"                                : "application/json",
    },
});
// Response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response, // Pass through successful responses
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to token expiration and avoid retry loops
        if (
            error.response &&
            error.response.status === 401 && // Token expired or unauthorized
            //    ( error.response.data.message === "Access Denied"||error.response.data.message === "Invalid Token")&&
            !originalRequest._retry
        ) {
            originalRequest._retry = true; // Mark request as retried to avoid loops

            try {
                // Call the updateAccessToken() function to get a new token
                await updateAccessToken();

                // Update the token in local storage
                const cookies = getCookiesData();
                // Update the authorization header for the failed request
                originalRequest.headers.Authorization = `Bearer ${cookies.accessToken}`;
                // Retry the original request with the new token
                return api(originalRequest);
            } catch (refreshError) {
                ////console.error("Failed to refresh token:", refreshError);
                return Promise.reject(refreshError);
            }
        }

        // For other errors, reject the promise
        return Promise.reject(error);
    }
);
api.interceptors.request.use(
    async (config) => {
        const coookies = getCookiesData();
        if (coookies && coookies.accessToken) {
            config.headers.Authorization = `Bearer ${coookies.accessToken}`;
        }
        // Encrypt only for specific endpoints
        //   if (config.url === '/secure-endpoint' && config.data) {
        if (config.headers['Content-Type']?.startsWith('multipart/form-data')) {
            return config;
        }
        if (config.data && ['post', 'put', 'patch'].includes(config.method.toLowerCase())) {
            if (typeof config.data === "string") {
                if (config.data.includes('"dataEncrypted":"true"')) {
                    return config;
                }
            }
            const encrypted = encryptData(config.data);
            config.data = {
                encryptedBody: encrypted,
                dataEncrypted: 'true'
            };
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => {
        if (response.data.dataEncrypted === 'true') {
            const { content, iv } = response.data.encryptedBody;
            const decryptedData = decryptData(content, iv);

            response.data = JSON.parse(decryptedData);
        }
        return response;
    },
    (error) => {
        if (
            error.response &&
            error.response.data &&
            error.response.data.dataEncrypted === 'true'
        ) {
            const { content, iv } = error.response.data.encryptedBody;
            const decryptedData = decryptData(content, iv);
            error.response.data = JSON.parse(decryptedData);
        }
        return Promise.reject(error);
    }
);



export default api;