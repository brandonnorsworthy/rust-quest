import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";

import AuthService from "@/service/authService";
import { useAuth } from "@/context/useAuth";
import Button from "../Button";
import { toast } from "../Toaster";

interface LoginPanelProps {
  onLoginSuccess: () => void;
  onRegistrationSuccess: () => void;
}

const LoginPanel: React.FC<LoginPanelProps> = (props) => {
  const {
    onLoginSuccess,
    onRegistrationSuccess,
  } = props;

  const { saveToken } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        setError("Please enter a username and password");
        return;
      }

      if (isRegistering) {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        const authResponse = await AuthService.register(username, password);
        saveToken(authResponse.token);
        onRegistrationSuccess();
        return;
      }

      const authResponse = await AuthService.login(username, password);
      saveToken(authResponse.token);
      onLoginSuccess();
    }
    catch (error: unknown) {
      console.error(error);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md p-2 shadow-lg bg-secondary">
        <div className="p-2 text-text">
          <h2 className="text-lg font-semibold text-muted-foreground">{isRegistering ? "Register" : "Login"}</h2>
          <p className="mt-2 text-sm text-text-secondary">Please enter your credentials to continue or&nbsp;
            <span
              onClick={() => toast.warning("This feature is not available yet.")}
              className="underline cursor-pointer text-buttonText-info"
              aria-label="Continue as a guest without registration"
            >
              continue as Guest
            </span>
          </p>
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
            className="w-full p-2 mt-4 border-gray-300 font-semi text-text placeholder:text-text/50 bg-white/25"
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

          {
            isRegistering && (
              <>
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
              </>
            )
          }

          <div className="flex flex-col items-end justify-center w-full p-2 text-text text-end">
            <span
              onClick={() => setIsRegistering(!isRegistering)}
              className="underline cursor-pointer"
              aria-label={isRegistering ? "Click here to log in" : "Click here to register"}
            >
              {isRegistering ? "Already have an account? Click to Log In" : "New here? Click to Register"}
            </span>

          </div>

          {
            error ?
              <div className="w-full mt-2 text-red-500 text-end">
                {error}
              </div> :
              <div className="w-full mt-2 text-red-500 text-end">
                &nbsp;
              </div>
          }

          <div className="flex justify-between mt-2">
            <Button
              text="cancel"
              htmlType="button"
            />
            <Button
              text={isRegistering ? "Register" : "Login"}
              htmlType="submit"
              type="confirm"
            />
          </div>
        </form>
      </div>
    </div>
  )
};

export default LoginPanel;