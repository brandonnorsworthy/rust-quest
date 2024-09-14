import metadata from '../UserModels/metadata';

export interface UserToken {
  userId: number;
  username: string;
  role: string;
  iat: number;
  metadata?: metadata
}