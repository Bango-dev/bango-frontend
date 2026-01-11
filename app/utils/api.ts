import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // send cookies automatically
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Global response interceptor
 * Handles API errors consistently for cookie-based auth
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const status = error.response?.status;
    const backendMessage = error.response?.data?.message;

    let message = "An unexpected error occurred";

    switch (status) {
      case 400:
        message = backendMessage || "Invalid input data.";
        break;
      case 401:
        message = backendMessage || "Unauthorized. Please sign in.";
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

    // ✅ Keep AxiosError shape
    error.message = message;

    return Promise.reject(error);
  }
);


export default api;
