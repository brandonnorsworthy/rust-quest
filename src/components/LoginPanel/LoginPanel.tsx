import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AuthService from "@/service/authService";
import { Input } from "../ui/input";

//todo: login vs register
const LoginPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      const authResponse = await AuthService.register(username, password);
      console.log(authResponse);
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="w-16 p-2 mt-2 text-white transition-colors rounded-md bg-slate-500 hover:bg-slate-400">
          Login
        </button>
      </DialogTrigger>
      <DialogContent className="bg-slate-100">
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
                className="w-16 p-2 mt-2 text-white transition-colors rounded-md bg-slate-500 hover:bg-slate-400"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>

  )
}

export default LoginPanel;