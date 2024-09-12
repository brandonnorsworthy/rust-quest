import React, { createContext, useState, useEffect, useContext } from "react";
import { UserToken } from "@/models/AuthModels/userToken";

const TOKEN_STORAGE_KEY = "token";

interface AuthContextProps {
  accessToken: string | null;
  user: UserToken | null;
  saveToken: (token: string) => void;
  clearToken: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserToken | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (storedToken) {
      setAccessToken(storedToken);
      setUser({ ...JSON.parse(atob(storedToken.split(".")[1])) });
    }
  }, []);

  useEffect(() => {
    if (!accessToken) return setUser(null);

    setUser({ ...JSON.parse(atob(accessToken.split(".")[1])) });
  }, [accessToken]);

  const saveToken = (newToken: string) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
    setAccessToken(newToken);
  };

  const clearToken = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, saveToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};