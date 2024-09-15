export type convertSuggestionIntoQuestBodyRequest = {
  title: string,
  description: string,
  objectives: string[],
  categoryId: number,
  image_url?: string,
}