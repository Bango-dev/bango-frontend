import axios from "axios";

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // const status = error.response?.status;
    const backendMessage = error.response?.data?.message;

    let message = "An unexpected error occurred";

    // if (status === 401 && typeof window !== "undefined") {
    //   const isAuthPage =
    //     window.location.pathname === "/signin" ||
    //     window.location.pathname === "/signup";

    //   if (!isAuthPage) {
    //     window.location.href = "/signin";
    //   }
    // }

    message = backendMessage || message;
    return Promise.reject(new Error(message));
  }
);

export default authApi;
