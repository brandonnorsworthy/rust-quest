export default interface RequestOptions {
  domain?: string;
  method: string;
  endpoint: string;
  accessToken?: string | null;
  body?: Record<string, unknown>;
  queryVariables?: Array<{ key: string; value: string }>;
  responseType?: unknown;
}