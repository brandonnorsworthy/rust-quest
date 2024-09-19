export interface EditQuestRequest {
  title: string,
  description: string,
  objectives: string[],
  image_url: string,
  categoryId: number,
  info_url?: string,
}