// utils/api.ts
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Add request interceptor to log what's being sent
api.interceptors.request.use(
  (config) => {
    // console.log("=== REQUEST ===");
    // console.log("URL:", config.url);
    // console.log("Method:", config.method);
    // console.log("Headers:", config.headers);
    // console.log("Cookies will be sent:", document.cookie);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // console.log("=== RESPONSE SUCCESS ===");
    // console.log("Status:", response.status);
    // console.log("Headers:", response.headers);
    return response;
  },
  (error: AxiosError<any>) => {
    // console.log("=== RESPONSE ERROR ===");
    // console.log("Status:", error.response?.status);
    // console.log("Data:", error.response?.data);
    // console.log("Headers:", error.response?.headers);

    const status = error.response?.status;
    const backendMessage = error.response?.data?.message;

    let message = "An unexpected error occurred";

    // If 401, just return the error (don't redirect here)
    // Let components handle 401 errors
    if (status === 401) {
      message = backendMessage || "Unauthorized. Please sign in.";
    }

    switch (status) {
      case 400:
        message = backendMessage || "Invalid input data.";
        break;
      case 403:
        message =
          backendMessage ||
          "You do not have permission to perform this action.";
        break;
      case 404:
        message = backendMessage || "Requested resource not found.";
        break;
      case 409:
        message = backendMessage || "Conflict with existing data.";
        break;
      case 500:
        message = backendMessage || "Server error. Please try again later.";
        break;
      default:
        if (backendMessage) message = backendMessage;
    }

    error.message = message;
    return Promise.reject(error);
  }
);

export default api;
