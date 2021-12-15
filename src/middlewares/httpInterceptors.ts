import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { LStorage } from '~/storage/storage';
import { AUTH_TOKEN } from '~/constants/storage';

function getAccessToken(): string | null {
  return LStorage.getItem(AUTH_TOKEN);
}

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const accessToken = getAccessToken();
  if (accessToken && config) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers['x-auth-token'] = accessToken;
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  // access token expired
  // if(error.response.status === 401 && error.config._retry) {
  //   error.config._retry = true;
  //   try {
  //     const result = await instance.post("/auth/refreshtoken", {
  //       refreshToken: 'xxx'
  //     });
  //     window.localStorage.setItem("accessToken", result.data.accessToken);
  //     instance.defaults.headers.common["x-access-token"] =  result.data.accessToken;

  //     return instance(error.config);
  //   } catch (err) {
  //     if (err.response && err.response.data) {
  //       return Promise.reject(err.response.data);
  //     }
  //     return Promise.reject(err);
  //   }
  // }

  // handle errors
  switch (error.response?.status) {
    case 400: {
      break;
    }
    case 500: {
      break;
    }
    default:
      break;
  }
  return Promise.reject(error);
};

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
