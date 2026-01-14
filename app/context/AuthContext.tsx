// context/AuthContext.tsx
"use client";

import {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import authApi from "../utils/api";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: any | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  // refreshUser: () => Promise<void>;
  setUser: (user: any | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // Start with true
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const router = useRouter();

  // const refreshUser = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const res = await authApi.get("/users/me");
  //     console.log("refreshUser response:", res.data);
  //     setUser(res.data.entity ?? null);
  //   } catch (error) {
  //     console.error("refreshUser error:", error);
  //     setUser(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      // router.replace("/login");
    }
  }, [router]);

  //  Initial auth check on mount
  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      // console.log("Starting initial auth check...");
      try {
        const res = await authApi.get("/users/me");
        console.log("Initial fetch success:", res.data);
        if (mounted) {
          setUser(res.data.entity ?? null);
        }
      } catch (error) {
        console.error("Initial fetch error:", error);
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          console.log("Initial auth check complete");
          setLoading(false);
          setInitialCheckDone(true);
        }
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      logout,
      setUser,
    }),
    [user, loading, logout]
  );

  //  Block render only during initial check
  if (!initialCheckDone) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Initializing...</div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
