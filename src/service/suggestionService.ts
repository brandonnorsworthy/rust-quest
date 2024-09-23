import sendRequest from "@/lib/sendRequest";
import CreateSuggestionRequest from "@/models/SuggestionModels/CreateSuggestionRequest";
import { convertSuggestionIntoQuestBodyRequest } from "@/models/SuggestionModels/suggestionRequests";
import { LeaderboardResponse, Suggestion } from "@/models/SuggestionModels/suggestionResponse";

const baseUrl = "/suggestions";

export default {
  /**
   * creates a new suggestion
   * @param userId {number}
   * @param title
   * @param suggestion
   * @returns a promise that resolves to the response from the server
   */
  createSuggestion: async (suggestion: CreateSuggestionRequest, accessToken: string) => await sendRequest({
    method: "POST",
    endpoint: `${baseUrl}`,
    body: { ...suggestion },
    accessToken
  }),

  /**
   * gets all suggestions
   * @returns a promise that resolves to the response from the server
   */
  getSuggestions: async (accessToken: string, page: number) => await sendRequest({
    method: "GET",
    endpoint: `${baseUrl}`,
    accessToken,
    queryParams: { page: page.toString() }
  }) as Promise<Suggestion[]>,

  /**
   * converts a suggestion into a quest
   * @param suggestionId {number}
   * @returns a promise that resolves to the response from the server
   */
  convertSuggestionIntoQuest: async (accessToken: string, suggestionId: number, convertSuggestionIntoQuestBody: convertSuggestionIntoQuestBodyRequest) => await sendRequest({
    method: "POST",
    endpoint: `${baseUrl}/${suggestionId}/quest`,
    accessToken,
    body: convertSuggestionIntoQuestBody
  }),

  getLeaderboard: async (accessToken: string) => await sendRequest({
    method: "GET",
    endpoint: `${baseUrl}/leaderboard`,
    accessToken
  }) as Promise<LeaderboardResponse[]>,

  deleteSuggestion: async (accessToken: string, suggestionId: number) => await sendRequest({
    method: "DELETE",
    endpoint: `${baseUrl}/${suggestionId}`,
    accessToken
  }) as Promise<void>,
}