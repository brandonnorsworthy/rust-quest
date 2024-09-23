import sendRequest from "@/lib/sendRequest";
import { AllQuestsResponse, Quest } from "../models/QuestModels/questResponse"

const basePath = '/quests';

export default {
  getRandomQuest: async (accessToken: string) => await sendRequest({
    method: 'GET',
    endpoint: `${basePath}/random-quest`,
    accessToken,
  }) as Promise<Quest>,

  /**
   * gets all quests (paginated)
   * @param accessToken - user's access token
   * @param page - page number
   * @returns
   */
  getQuests: async (accessToken: string, page: number) => await sendRequest({
    method: 'GET',
    endpoint: `${basePath}`,
    accessToken,
    queryParams: { page: page.toString() }
  }) as Promise<AllQuestsResponse[]>,

  editQuest: async (accessToken: string, questId: number, questData: Partial<Quest>) => await sendRequest({
    method: 'PUT',
    endpoint: `${basePath}/${questId}`,
    accessToken,
    body: questData
  }) as Promise<Quest>,

  deleteQuest: async (accessToken: string, questId: number) => await sendRequest({
    method: 'DELETE',
    endpoint: `${basePath}/${questId}`,
    accessToken
  }) as Promise<void>
}