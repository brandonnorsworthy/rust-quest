import sendRequest from "@/lib/sendRequest";
import CreateSuggestionRequest from "@/models/SuggestionModels/CreateSuggestionRequest";

const baseUrl = "/suggestions";

export default {
  /**
   * creates a new suggestion
   * @param userId {number}
   * @param title
   * @param suggestion
   * @returns a promise that resolves to the response from the server
   */
  createSuggestion: async (suggestion: CreateSuggestionRequest, accessToken: string | null) => {
    return await sendRequest({
      method: "POST",
      endpoint: baseUrl,
      body: { ...suggestion },
      accessToken
    });
  },

  /**
   * gets all suggestions
   * @returns a promise that resolves to the response from the server
   */
  getSuggestions: async (accessToken: string) => {
    return await sendRequest({
      method: "GET",
      endpoint: baseUrl,
      accessToken
    });
  },
}