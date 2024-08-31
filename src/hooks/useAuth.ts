import { useState, useEffect } from "react";

const TOKEN_STORAGE_KEY = "token";

interface User {
  userId: number;
  username: string;
  role: string;
  iat: number;
}

const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (storedToken) {
      setAccessToken(storedToken);
      setUser({ ...JSON.parse(atob(storedToken.split(".")[1])) });
    }
  }, []);

  const saveToken = (newToken: string) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
    setAccessToken(newToken);
  };

  const clearToken = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setAccessToken(null);
  };

  return {
    accessToken,
    saveToken,
    clearToken,
    user,
  };
};

export default useAuth;