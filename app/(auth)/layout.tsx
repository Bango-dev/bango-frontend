"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext) {
    throw new Error("AuthLayout must be used within AuthProvider");
  }

  const { user, loading } = authContext;

  useEffect(() => {
    // If user is logged in, redirect to timeline
    if (!loading && user) {
      router.replace("/timeline");
    }
  }, [user, loading, router]);

  // Show loading while checking
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  // If user exists, don't show auth pages (redirect in useEffect)
  if (user) {
    return null;
  }

  return <>{children}</>;
}
