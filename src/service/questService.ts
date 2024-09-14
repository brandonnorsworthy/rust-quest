import sendRequest from "@/lib/sendRequest";
import { AllQuestsResponse, Quest } from "../models/QuestModels/questResponse"

const basePath = '/quests';

export default {
  getRandomQuest: async (accessToken: string) => await sendRequest({
    method: 'GET',
    endpoint: `${basePath}/random-quest?filters=pvp,raiding`,
    accessToken
  }) as Promise<Quest>,

  /**
   * gets all quests (paginated)
   * @param accessToken - user's access token
   * @param page - page number
   * @returns
   */
  getQuests: async (accessToken: string, page: number) => await sendRequest({
    method: 'GET',
    endpoint: `${basePath}/`,
    accessToken,
    queryVariables: [{ key: "page", value: page.toString() }]
  }) as Promise<AllQuestsResponse[]>,
}