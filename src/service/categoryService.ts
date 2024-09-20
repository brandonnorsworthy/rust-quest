import sendRequest from "@/lib/sendRequest";
import { Category } from "@/models/CategoryModels/categoryResponse";

const basePath = '/categories';

export default {
  getCategories: async (accessToken: string) => await sendRequest({
    method: 'GET',
    endpoint: `${basePath}/`,
    accessToken
  }) as Promise<Category[]>,
}