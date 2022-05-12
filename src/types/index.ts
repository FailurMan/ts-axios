export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'head'
  | 'HEAD'
export interface AxiosRequestConfig {
  url?: string //请求地址
  method?: Method //请求方法
  data?: any //携带参数
  params?: any //携带参数
  headers?: any //请求头
  responseType?: XMLHttpRequestResponseType //response类型
  timeout?: number //请求超时时间
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise
  get(url: string, config?: AxiosRequestConfig): AxiosPromise
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise
  head(url: string, config?: AxiosRequestConfig): AxiosPromise
  options(url: string, config?: AxiosRequestConfig): AxiosPromise
  post(url: string, data?: any, config?: AxiosPromise): AxiosPromise
  put(url: string, data?: any, config?: AxiosPromise): AxiosPromise
  patch(url: string, data?: any, config?: AxiosPromise): AxiosPromise
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
}
