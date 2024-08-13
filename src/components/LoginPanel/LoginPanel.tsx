import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AuthService from "@/service/authService";
import { Input } from "../ui/input";
import { AxiosError } from "axios";

//todo: login vs register
const LoginPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  useEffect(() => {
    if (!open) {
      setUsername("");
      setPassword("");
      setError("");
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        setError("Please enter a username and password");
        return;
      }
      if (isRegistering) {
        const authResponse = await AuthService.register(username, password);
        localStorage.setItem("token", authResponse?.token);
        setOpen(false);
        return;
      }
      const authResponse = await AuthService.login(username, password);
      localStorage.setItem("token", authResponse?.token);
      setOpen(false);
    }
    catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.error || "An error occurred");
        return;
      }
      setError("An unkown error occurred");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger asChild>
        <button
          className="p-2 mt-2 text-white transition-colors rounded-md bg-slate-500 hover:bg-slate-400"
          onClick={() => setOpen(true)}
        >
          Login
        </button>
      </DialogTrigger>
      <DialogContent
        className="bg-slate-100"
        onCloseAutoFocus={(event) => {
          event.preventDefault(); // Prevents the dialog from closing automatically
        }}
      >
        <DialogHeader>
          <DialogTitle className='text-muted-foreground'>Login</DialogTitle>
          <DialogDescription>
            Please enter your credentials to continue
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="p-2">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <Input
              id="username"
              type="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            />
          </div>
          <div className="flex justify-end">
            <div className="flex flex-col items-end">
              {error && (
                <p className="text-right text-red-500">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="p-2 mt-2 text-white transition-colors rounded-md bg-slate-500 hover:bg-slate-400"
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
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default LoginPanel;