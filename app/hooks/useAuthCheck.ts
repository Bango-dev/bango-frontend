import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import authApi from "../utils/api";

export const useAuthCheck = () => {
  const { setUser, user, loading, setLoading } = useContext(AuthContext);

  useEffect(() => {
    // Only fetch if user is not already set and we're not loading
    if (user || loading) return;

    const checkAuth = async () => {
      try {
        setLoading(true);

        // Call backend to get current authenticated user
        const response = await authApi.get("/users/me");

        if (response.data?.entity || response.data?.data) {
          const userData = response.data.entity || response.data.data;
          console.log("User authenticated:", userData);
            setUser(userData);
            
        }
      } catch (error: any) {
        console.log("Not authenticated:", error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [user, loading, setUser, setLoading]);
};
