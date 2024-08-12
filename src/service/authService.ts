import sendRequest from "@/lib/sendRequest";

//todo: add interfaces for the response
export default {

  /**
   * register a new user
   * @param username
   * @param password 
   * @returns a promise that resolves to the response from the server
   */
  register: async (username: string, password: string) => {
    return await sendRequest({
      method: 'POST',
      endpoint: '/auth/register',
      body: {
        username,
        password
      }
    });
  },

  /**
   * login a user
   * @param username
   * @param password 
   * @returns a promise that resolves to the response from the server
   */
  login: async (username: string, password: string) => {
    return await sendRequest({
      method: 'POST',
      endpoint: '/auth/login',
      body: {
        username,
        password
      }
    });
  },

  /**
   * logout a user
   * @returns a promise that resolves to the response from the server
   */
  logout: async () => {
    return await sendRequest({
      method: 'POST',
      endpoint: '/auth/logout',
    });
  }


}