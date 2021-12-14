import { AxiosInstance } from 'axios';
import axiosInstance, { IConfig } from './httpInstance';

class HttpRequest {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axiosInstance;
  }

  get instance(): AxiosInstance {
    return this.api;
  }

  _clean(obj: any) {
    for (const key in obj) {
      if (obj[key] == null || obj[key] === '') {
        delete obj[key];
      }
    }
  }

  async _request(url: string, opts: IConfig) {
    this._clean(opts.params);
    const res = await this.api(url, opts)
      .then(res => res.data)
      .catch(err => err.data);
    if (res && (res.code === 0 || res.data)) return res.data;
    if (res && res.code === 1 && res.message) throw res.message;
    throw 'Internal Error';
  }

  get(url: string, opts: IConfig = {}) {
    return this._request(url, { ...opts, method: 'GET' });
  }

  post(url: string, opts: IConfig) {
    return this._request(url, { ...opts, method: 'POST' });
  }

  put(url: string, opts: IConfig) {
    return this._request(url, { ...opts, method: 'PUT' });
  }

  delete(url: string, opts: IConfig = {}) {
    return this._request(url, { ...opts, method: 'DELETE' });
  }

  patch(url: string, opts: IConfig = {}) {
    return this._request(url, { ...opts, method: 'PATCH' });
  }
}

const httpRequest = new HttpRequest();

export default httpRequest;
