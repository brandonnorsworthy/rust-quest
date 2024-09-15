import sendRequest from "@/lib/sendRequest";
import { LoginResponse } from "@/models/AuthModels/loginResponse";
import { RegisterResponse } from "@/models/AuthModels/registerResponse";

export default {
  /**
   * register a new user
   * @param username
   * @param password
   * @returns a promise that resolves to the response from the server
   */
  register: async (username: string, password: string) => await sendRequest({
    method: 'POST',
    endpoint: '/auth/register',
    body: {
      username,
      password
    }
  }) as Promise<RegisterResponse>,

  /**
   * register a new guest user
   * @param accessToken
   * @param username
   * @param password
   * @returns a promise that resolves to the response from the server
   */
  registerGuest: async (accessToken: string, username: string, password: string) => await sendRequest({
    method: 'POST',
    endpoint: '/auth/register-guest',
    accessToken,
    body: {
      username,
      password
    }
  }) as Promise<RegisterResponse>,

  /**
   * login a user
   * @param username
   * @param password
   * @returns a promise that resolves to the response from the server
   */
  login: async (username: string, password: string) => await sendRequest({
    method: 'POST',
    endpoint: '/auth/login',
    body: {
      username,
      password
    }
  }) as Promise<LoginResponse>,

  /**
 * login a guest user
 * @returns a promise that resolves to the response from the server
 */
  guestLogin: async () => await sendRequest({
    method: 'POST',
    endpoint: '/auth/login-guest',
  }) as Promise<LoginResponse>,

  refreshToken: async (accessToken: string) => await sendRequest({
    method: 'POST',
    endpoint: '/auth/token',
    accessToken
  }) as Promise<{ token: string }>,

  /**
   * logout a user
   * @returns a promise that resolves to the response from the server
   */
  logout: async () => await sendRequest({
    method: 'POST',
    endpoint: '/auth/logout',
  }),
}