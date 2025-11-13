import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    let message = "An unexpected error occurred";

    if (status === 400) message = "Invalid input data.";
    else if (status === 401) message = "Unauthorized. Please sign in.";
    else if (status === 500) message = "Server error. Please try again later.";

    return Promise.reject(new Error(message));
  }
);

export default api;
