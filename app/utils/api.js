import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const backendMessage = error.response?.data?.message;
    let message = "An unexpected error occurred";

    if (status === 400) {
      message = "Invalid input data.";
    } else if (status === 401) {
      message = backendMessage || "Unauthorized. Please sign in.";

      // Only clear auth and redirect if not on login/register
      const isAuthPage =
        typeof window !== "undefined" &&
        (window.location.pathname === "/login" ||
          window.location.pathname === "/register");

      if (!isAuthPage) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    } else if (status === 403) {
      message = backendMessage || "Access forbidden.";
    } else if (status === 404) {
      message = backendMessage || "Resource not found.";
    } else if (status === 409) {
      message = backendMessage || "Conflict with existing data.";
    } else if (status === 500) {
      message = backendMessage || "Server error. Please try again later.";
    } else if (backendMessage) {
      // Catch any other status codes with backend messages
      message = backendMessage;
    }

    const customError = new Error(message);
    customError.originalError = error;
    customError.status = status;

    return Promise.reject(customError);
  }
);

export default api;
