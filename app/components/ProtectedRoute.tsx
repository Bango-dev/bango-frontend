"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import { usePathname } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  if (!authContext) {
    throw new Error("ProtectedRoute must be used within AuthProvider");
  }

  const { user, loading } = authContext;

  console.log("ProtectedRoute - loading:", loading, "user:", user);


const PUBLIC_ROUTES = ["/", "/login", "/register", "/about-us"];

useEffect(() => {
  if (PUBLIC_ROUTES.includes(pathname)) return;

  if (!loading && !user) {
    router.replace("/login");
  }
}, [user, loading, pathname, router]);


  //  Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  //  If not loading and no user, show nothing (redirect happens in useEffect)
  if (!user) {
    return null;
  }

  //  User is authenticated, render protected content
  return <>{children}</>;
}
