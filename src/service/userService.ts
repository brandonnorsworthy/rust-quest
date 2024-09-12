import sendRequest from "@/lib/sendRequest";

const basePath = '/users';

export default {
  completeQuest: async (accessToken: string, questId: number) => await sendRequest({
    method: 'POST',
    endpoint: `${basePath}/completed-quests/${questId}`,
    accessToken
  }),
}