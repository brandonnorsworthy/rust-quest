import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { useAuth } from "@/context/useAuth";
import Button from "../Button";
import { toast } from "../Toaster";
import authService from "@/service/authService";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 10000);
  }, [error]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    try {
      let username = (form.elements.namedItem("username") as HTMLInputElement).value;
      let password = (form.elements.namedItem("password") as HTMLInputElement).value;
      let confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement)?.value;

      if (disableButtons) return;
      if (!username || !password) return setError("Please enter a username and password");

      username = username.trim();
      password = password.trim();

      if (isRegistering) {
        if (!confirmPassword) return setError("Please confirm your password");
        confirmPassword = confirmPassword.trim();

        if (password !== confirmPassword) return setError("Passwords do not match");

        const authResponse = await authService.register(username, password);
        saveToken(authResponse.token);
        onRegistrationSuccess();
        return;
      }

      const authResponse = await authService.login(username, password);
      saveToken(authResponse.token);
      onLoginSuccess();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 429) {
          setError("Too many requests. Please try again later.");
          return;
        }
        setError(error.response?.data.error || "An error occurred");
        return;
      }
      setError("An unknown error occurred");
    }
  }

  const loginAsGuest = async () => {
    try {
      setDisableButtons(true);

      const loginGuestResponse = await authService.loginGuest();
      saveToken(loginGuestResponse.token);

      onRegistrationSuccess();
    } catch (error: unknown) {
      toast.error("Failed to log in as guest", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md p-2 shadow-lg bg-secondary">
        <div className="p-2 text-text">
          <h2 className="text-lg font-semibold text-muted-foreground">{isRegistering ? "Register" : "Login"}</h2>
          <p className="mt-2 text-sm text-text-secondary">Please enter your credentials to continue or&nbsp;
            <span
              onClick={loginAsGuest}
              className="font-bold underline cursor-pointer text-buttonText-info"
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

          <div className="flex flex-col items-start w-full gap-2 sm:items-center sm:flex-row sm:justify-between">
            <Button
              htmlType="button"
              onClick={() => navigate("/")}
            >
              cancel
            </Button>
            <Button
              htmlType="submit"
              type="confirm"
            >
              {isRegistering ? "register" : "login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default LoginPanel;