import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "../ui/input";

import AuthService from "@/service/authService";
import useAuth from "@/hooks/useAuth";

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
        setError(error.response?.data.error || "An error occurred");
        return;
      }
      setError("An unkown error occurred");
    }
  }

  return (
    <Dialog open={true} modal>
      <DialogContent
        className="bg-slate-100"
      >
        <DialogHeader>
          <DialogTitle className='text-muted-foreground'>{isRegistering ? "Register" : "Login"}</DialogTitle>
          <DialogDescription>
            Please enter your credentials to continue
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col" onSubmit={handleSubmit} data-testid="login-form">
          <div className="p-2">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
              data-testid="username-input"
            />
          </div>
          <div className="p-2">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
              data-testid="password-input"
            />
          </div>
          <div className="flex justify-end">
            <div className="flex flex-col items-end">
              {error && (
                <p className="text-right text-red-500" data-testid="error-message">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="p-2 mt-2 text-white transition-colors rounded-md bg-slate-500 hover:bg-slate-400"
                aria-label={isRegistering ? "Register" : "Login"}
                data-testid="submit-button"
              >
                {isRegistering ? "Register" : "Login"}
              </button>
            </div>
          </div>
        </form>
        <DialogFooter>
          <button
            className="border-none text-muted-foreground bg-none test-sm"
            onClick={() => setIsRegistering(!isRegistering)}
            aria-label={isRegistering ? "Switch to Login" : "Switch to Register"}
            data-testid="toggle-register-button"
          >
            {
              isRegistering ?
                "Click here to Login instead" :
                "Click here to Register instead"
            }
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPanel;