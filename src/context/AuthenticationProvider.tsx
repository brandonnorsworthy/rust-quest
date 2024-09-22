import React, { createContext, useState, useEffect, useCallback } from "react";
import { UserToken } from "@/models/AuthModels/userToken";
import { toast } from "@/components/Toaster";

const TOKEN_STORAGE_KEY = "token";

export interface AuthContextProps {
  accessToken: string | null;
  user: UserToken | null;
  saveToken: (token: string) => void;
  clearToken: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserToken | null>(null);

  // Load token from localStorage once during component mount
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (storedToken) {
      try {
        setAccessToken(storedToken);
        const parsedUser = JSON.parse(atob(storedToken.split(".")[1]));
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        toast.error("Failed to load token, clearing cache", error);
      }
    }
  }, []);

  // Update user whenever accessToken changes
  useEffect(() => {
    if (!accessToken) {
      setUser(null);
      return;
    }

    try {
      const parsedUser = JSON.parse(atob(accessToken.split(".")[1]));
      setUser(parsedUser);
    } catch (error) {
      setUser(null);
      toast.error("Invalid token format", error);
    }
  }, [accessToken]);

  const saveToken = useCallback((newToken: string) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
    setAccessToken(newToken);
  }, []);

  const clearToken = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setAccessToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, user, saveToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};
