import metadata from '../UserModels/metadata';

export interface UserToken {
  userId: number;
  username: string;
  role: role;
  iat: number;
  metadata?: metadata;
}

export type role = "user" | "admin" | "moderator" | "guest";