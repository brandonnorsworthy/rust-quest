export default interface RequestOptions {
  domain?: string;
  method: string;
  endpoint: string;
  accessToken?: string | null;
  body?: Record<string, unknown>;
  queryParams?: Record<string, string>;
  responseType?: unknown;
}