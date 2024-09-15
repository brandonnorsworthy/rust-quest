import metadata from '../UserModels/metadata';

export interface UserToken {
  userId: number;
  username: string;
  role: "user" | "admin" | "moderator" | "guest";
  iat: number;
  metadata?: metadata
}