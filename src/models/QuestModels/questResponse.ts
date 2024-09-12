export interface Quest {
  id: number,
  title: string,
  description: string,
  objectives: string[],
  image_url: string,
  category: string,
  info_url?: string
}