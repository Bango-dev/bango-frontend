// components/ProtectedRoute.tsx
"use client";

import { useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import { validateRedirectUrl } from "../utils/redirectvalidation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname(); // ✅ Get current path

  if (!authContext) {
    throw new Error("ProtectedRoute must be used within AuthProvider");
  }

  const { user, loading } = authContext;

  useEffect(() => {
    if (!loading && !user) {
      console.log("No user, redirecting to login");

      // ✅ Pass current URL as redirect parameter
      // ✅ Validate before encoding
      const validatedPath = validateRedirectUrl(pathname);
      const encodedPath = encodeURIComponent(validatedPath);
      router.replace(`/login?redirect=${encodedPath}`);
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
