import RequestOptions from '@/models/RequestOptions/requestOptions';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_DOMAIN } from '../config';

/**
 * Generic HTTP request function
 * @param {Object} options - options to send with request
 * @param {String} [options.domain=''] - API domain to send request to
 * @param {String} options.method - HTTP Request type
 * @param {String} options.endpoint - API endpoint to send request
 * @param {String} options.accessToken - JWT Bearer access token to authenticate user on API
 * @param {Object} [options.body={}] - body to send with request
 * @param {Array} [options.queryVariables=[]] - query variables which are appended on the URL Request ex: [{key: 'userId', value: 12}, {key: 'businessId', value: 244}]
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
      queryVariables = [],
      responseType = 'json'
    } = options;

    const config: AxiosRequestConfig = {};
    config.responseType = responseType as 'json';
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`
      };
    }

    const queryParameters = new URLSearchParams();
    queryVariables.forEach(param => queryParameters.append(param.key, param.value));
    const queryString = queryParameters.toString().length > 0 ? `?${queryParameters.toString()}` : '';

    axios({
      method,
      url: `${domain ? domain : ''}${endpoint}${queryString}`,
      data: body,
      ...config
    }).then((response: AxiosResponse<unknown>) => {
      resolve(response.data);
    }).catch((error: unknown) => {
      console.error(`Failed to send request to ${endpoint}:`, error);
      reject(error);
    });
  });
};


export default sendRequest;