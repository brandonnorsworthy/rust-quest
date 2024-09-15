import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";

import AuthService from "@/service/authService";
import { useAuth } from "@/context/useAuth";
import Button from "../../components/Button";

interface RegisterAccountProps {
  onClose: () => void;
}

const RegisterAccount: React.FC<RegisterAccountProps> = ({ onClose }) => {
  const { saveToken, accessToken } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!accessToken) return;
      if (!username || !password) {
        setError("Please enter a username and password");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const authResponse = await AuthService.registerGuest(accessToken, username, password);
      saveToken(authResponse.token);
      onClose();
      return;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 429) {
          setError("Too many requests. Please try again later.");
          return;
        }
        setError(error.response?.data.error || "An error occurred");
        return;
      }
      setError("An unkown error occurred");
    }
  }

  return (
    <div className="w-full md:w-[24rem]">
      <div className="p-2 text-text">
        <h2 className="text-lg font-semibold text-muted-foreground">Register Guest User</h2>
        <p className="text-sm text-text-secondary">In order to use this feature please complete your account registration</p>
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="username" className="sr-only">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mt-2 border-gray-300 font-semi text-text placeholder:text-text/50 bg-white/25"
          aria-label="Username"
        />

        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mt-2 border-gray-300 font-semi text-text placeholder:text-text/50 bg-white/25"
          aria-label="Password"
        />

        <label htmlFor="confirmPassword" className="sr-only">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mt-2 border-gray-300 font-semi text-text placeholder:text-text/50 bg-white/25"
          aria-label="confirmPassword"
        />

        {
          error ?
            <div className="w-full mt-2 text-red-500 text-end">
              {error}
            </div> :
            <div className="w-full mt-2 text-red-500 text-end">
              &nbsp;
            </div>
        }

        <div className="flex justify-between mt-2 space-x-2">
          <Button
            htmlType="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            type="confirm"
          >
            register
          </Button>
        </div>
      </form>
    </div>
  )
};

export default RegisterAccount;