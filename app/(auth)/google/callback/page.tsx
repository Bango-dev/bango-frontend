"use client";

import { useEffect, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "../../../context/AuthContext";
import authApi from "../../../utils/api";
import toast from "react-hot-toast";

const GoogleCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useContext(AuthContext)!;

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the state parameter from URL (your backend may send additional params)
        const state = searchParams.get("state");
        console.log("OAuth callback received with state:", state);

        // Fetch the authenticated user from your backend
        // The backend should have already set the session/cookie
        const response = await authApi.get("/users/me");

        if (response.data.entity) {
          console.log("User authenticated:", response.data.entity);
          setUser(response.data.entity);

          // Small delay to ensure state is updated
          await new Promise((resolve) => setTimeout(resolve, 0));

          toast.success("Google sign-in successful!");
          router.replace("/timeline");
        } else {
          toast.error("Authentication succeeded but user data is missing");
          router.replace("/login");
        }
      } catch (error: any) {
        console.error("OAuth callback error:", error);
        toast.error(
          error.message || "Authentication failed. Please try again."
        );
        router.replace("/login");
      }
    };

    handleCallback();
  }, [router, setUser, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Completing sign-in...</h1>
        <p className="text-gray-600">Please wait while we authenticate you.</p>
      </div>
    </div>
  );
};

export default GoogleCallback;
