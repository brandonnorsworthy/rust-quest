import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_DOMAIN } from '../config';
import RequestOptions from '@/models/RequestOptions/requestOptions';

/**
 * Generic HTTP request function
 * @param {Object} options - options to send with request
 * @param {String} [options.domain=''] - API domain to send request to
 * @param {String} options.method - HTTP Request type
 * @param {String} options.endpoint - API endpoint to send request
 * @param {String} options.accessToken - JWT Bearer access token to authenticate user on API
 * @param {Object} [options.body={}] - body to send with request
 * @param {Record<string, string>} [options.queryParams={}] - object representing query parameters, e.g., { userId: '12', businessId: '244' }
 * @param {String} [options.responseType='json'] - type of response to expect from API
 * @returns {Promise} If the request is successful, the promise will resolve with the response data and deconstruct it automatically. If the request fails, the promise will reject with the entire error for you to absorb with .status or .errorMessage and such.
 */
const sendRequest = (options: RequestOptions): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const {
      domain = API_DOMAIN,
      method = 'GET',
      endpoint,
      accessToken,
      body = {},
      queryParams = {},
      responseType = 'json'
    } = options;

    const config: AxiosRequestConfig = {};
    config.responseType = responseType as 'json';
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`
      };
    }

    // Construct query string from query parameters object
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${domain ? domain : ''}${endpoint}${queryString ? `?${queryString}` : ''}`;

    axios({
      method,
      url,
      data: body,
      ...config
    })
      .then((response: AxiosResponse<unknown>) => {
        resolve(response.data);
      })
      .catch((error: AxiosError) => {
        console.error(`Failed to send request to ${endpoint}:`, error);
        reject(error);
      });
  });
};

export default sendRequest;
