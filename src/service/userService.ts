import sendRequest from "@/lib/sendRequest";
import { User } from "@/models/UserModels/userResponse";

const basePath = '/users';

export default {
  completeQuest: async (accessToken: string, questId: number) => await sendRequest({
    method: 'POST',
    endpoint: `${basePath}/completed-quests/${questId}`,
    accessToken
  }) as Promise<string>,

  incompleteQuest: async (accessToken: string, questId: number) => await sendRequest({
    method: 'DELETE',
    endpoint: `${basePath}/completed-quests/${questId}`,
    accessToken
  }),

  updateSettings: async (accessToken: string, settings: {
    disableAnimations?: boolean,
    categoryFilters?: number[],
    instrumentDLC?: boolean,
    voicePropsDLC?: boolean,
    sunburnDLC?: boolean,
  }) => await sendRequest({
    method: 'PUT',
    endpoint: `${basePath}/settings`,
    accessToken,
    body: settings
  }),

  getUsers: async (accessToken: string) => await sendRequest({
    method: 'GET',
    endpoint: `${basePath}`,
    accessToken
  }) as Promise<User[]>,
}