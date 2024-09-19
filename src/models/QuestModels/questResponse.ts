export interface Quest {
  id: number,
  title: string,
  description: string,
  objectives: string[],
  image_url: string,
  category: string,
  info_url?: string,
  username?: string,
}

export interface AllQuestsResponse extends Quest {
  completed: boolean;
}