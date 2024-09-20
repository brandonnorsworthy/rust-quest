export interface Suggestion {
  id: number;
  username: string;
  title: string;
  description: string;
}

export interface LeaderboardResponse {
  id: number;
  username: string;
  suggestions: number;
}