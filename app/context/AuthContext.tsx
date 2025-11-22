"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("access_token");

    if (!storedUser || storedUser === "undefined" || storedUser === "null") {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      setLoading(false);
      return;
    }

    if (!storedToken) {
      localStorage.removeItem("user");
      setLoading(false);
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData, token) => {
    console.log(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("access_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
