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

const LoginPanel: React.FC<LoginPanelProps> = ({ onLoginSuccess, onRegistrationSuccess }) => {
  const { saveToken } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 10000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value.trim();
    const confirmPassword = isRegistering
      ? (form.elements.namedItem("confirmPassword") as HTMLInputElement)?.value.trim()
      : null;

    if (!username || !password) {
      return setError("Please enter a username and password.");
    }

    if (isRegistering && password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    setDisableButtons(true);
    try {
      let authResponse;
      if (isRegistering) {
        authResponse = await authService.register(username, password);
        onRegistrationSuccess();
      } else {
        authResponse = await authService.login(username, password);
        onLoginSuccess();
      }

      saveToken(authResponse.token);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 429) {
          setError("Too many requests. Please try again later.");
        } else {
          setError(error.response?.data?.error || "An error occurred.");
        }
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setDisableButtons(false);
    }
  };

  const loginAsGuest = async () => {
    setDisableButtons(true);
    try {
      const loginGuestResponse = await authService.loginGuest();
      saveToken(loginGuestResponse.token);
      onRegistrationSuccess();
    } catch (error: unknown) {
      toast.error("Failed to log in as guest", error);
    } finally {
      setDisableButtons(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md p-2 shadow-lg bg-secondary">
        <div className="p-2 text-text">
          <h2 className="text-lg font-semibold text-muted-foreground">
            {isRegistering ? "Register" : "Login"}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Please enter your credentials to continue or&nbsp;
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
          <input
            id="username"
            type="text"
            placeholder="username"
            className="w-full p-2 mt-4 border-gray-300 font-semi text-text placeholder:text-text/50 bg-white/25"
            aria-label="Username"
          />
          <input
            id="password"
            type="password"
            placeholder="password"
            className="w-full p-2 mt-2 border-gray-300 font-semi text-text placeholder:text-text/50 bg-white/25"
            aria-label="Password"
          />
          {isRegistering && (
            <input
              id="confirmPassword"
              type="password"
              placeholder="confirm password"
              className="w-full p-2 mt-2 border-gray-300 font-semi text-text placeholder:text-text/50 bg-white/25"
              aria-label="Confirm Password"
            />
          )}
          {error && (
            <div className="w-full mt-2 text-red-500 text-end">
              {error}
            </div>
          )}
          <div className="flex flex-col items-end justify-center w-full p-2 text-text text-end">
            <span
              onClick={() => setIsRegistering(!isRegistering)}
              className="underline cursor-pointer"
              aria-label={isRegistering ? "Click here to log in" : "Click here to register"}
            >
              {isRegistering
                ? "Already have an account? Click to Log In"
                : "New here? Click to Register"}
            </span>
          </div>
          <div className="flex flex-col items-start w-full gap-2 sm:items-center sm:flex-row sm:justify-between">
            <Button
              htmlType="button"
              onClick={() => navigate("/")}
              disabled={disableButtons}
            >
              cancel
            </Button>
            <Button
              htmlType="submit"
              type="confirm"
              disabled={disableButtons}
            >
              {isRegistering ? "register" : "login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPanel;
