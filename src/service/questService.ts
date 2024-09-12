import sendRequest from "@/lib/sendRequest";
import { Quest } from "../models/QuestModels/questResponse"

const basePath = '/quests';

export default {
  getRandomQuest: async (accessToken: string) => await sendRequest({
    method: 'GET',
    endpoint: `${basePath}/random-quest?filters=pvp,raiding`,
    accessToken
  }) as Promise<Quest>,
}