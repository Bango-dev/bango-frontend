"use client";

import { createContext, useEffect, useState, useMemo } from "react";
import authApi from "../utils/api";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: any | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  setUser: (user: any | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // -----------------------------
  // Fetch or refresh user data
  // -----------------------------
  const refreshUser = async () => {
    setLoading(true);
    try {
      const res = await authApi.get("/users/me");
      setUser(res.data.entity);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      try {
        const res = await authApi.get("/users/me");
        if (mounted) {
          setUser(res.data.entity     );
        }
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, []);

  // -----------------------------
  // Logout function
  // -----------------------------
  const logout = async () => {
    try {
      await authApi.post("/auth/logout");
    } finally {
      setUser(null);
      router.replace("/login");
    }
  };

  // -----------------------------
  // Context value
  // -----------------------------
  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      logout,
      refreshUser,
      setUser,
    }),
    [user, loading]
  );

  // Block render until auth is resolved
  if (loading) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
