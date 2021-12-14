import axios, { AxiosRequestConfig } from 'axios';
import Config from '~/config';

export type IConfig = AxiosRequestConfig & {
  showSpinner?: boolean;
};

const requestConfig: IConfig = {
  baseURL: Config.serverUrl,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'false',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE'
  },
  withCredentials: false,
  showSpinner: false
};

const axiosInstance = axios.create(requestConfig);

export default axiosInstance;
