import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type IRequestConfig<T = AxiosResponse> = AxiosRequestConfig;

export type IAxiosResponse<T> = {
  ResponseStatus: {
    responseStatusType: {
      responseCode: number;
      responseDesc: 'success' | 'failure';
      timestamp: number;
    };
  };
  body: T;
};

export class Request {
  instance: AxiosInstance;

  constructor(config: IRequestConfig) {
    this.instance = axios.create(config);

    // 全局请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        // @ts-ignore
        config.headers = {
          'access-token':
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODM3OTY5MDIsInVzZXJuYW1lIjoidHpoYW5nbUB0cmlwLmNvbSJ9.WxteUC9_b0EWzApVV8YVjQ-KPiiKpbYV2c3l0kDEdfA',
        };

        return config;
      },
      (error) => Promise.reject(error),
    );

    // 全局响应拦截
    this.instance.interceptors.response.use(
      (response) => {
        if (response.data.responseStatusType.responseDesc === 'no permission') {
          return Promise.reject(response.data.responseStatusType.responseDesc);
        }
        return Promise.resolve(response.data);
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  // 返回的Promise中结果类型为AxiosResponse<any>
  request<Res>(config: AxiosRequestConfig): Promise<IAxiosResponse<Res>> {
    return new Promise<IAxiosResponse<Res>>((resolve, reject) => {
      this.instance
        .request<any, IAxiosResponse<Res>>(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // 封装 GET 请求方法
  get<Res>(url: string, params?: any, config?: AxiosRequestConfig): Promise<IAxiosResponse<Res>> {
    return this.request<Res>({
      url,
      params,
      ...config,
    });
  }

  // 封装 POST 请求方法
  post<Res>(url: string, params?: any, config?: AxiosRequestConfig): Promise<IAxiosResponse<Res>> {
    return this.request<Res>({
      url,
      data: params,
      method: 'POST',
      ...config,
    });
  }

  // 封装 PATCH 请求方法
  patch<Res>(url: string, params?: any, config?: AxiosRequestConfig): Promise<IAxiosResponse<Res>> {
    return this.request<Res>({
      url,
      data: params,
      method: 'PATCH',
      ...config,
    });
  }

  // 封装 DELETE 请求方法
  delete<Res>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig,
  ): Promise<IAxiosResponse<Res>> {
    return this.request<Res>({
      url,
      data: params,
      method: 'DELETE',
      ...config,
    });
  }
}

const request = new Request({
  timeout: 300000,
});

export default request;
