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
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken
  withCredentials?: boolean //是否可跨域
  xsrfCookieName?: string //Cookie信息
  xsrfHeaderName?: string //Header信息
  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void
  auth?: AxiosBasicCredentials
  validateStatus?: (status: number) => boolean //状态码校验规则
  paramsSerializer?: (params: any) => string //自定义序列化参数
  baseURL?: string
  [propName: string]: any
}

export interface AxiosBasicCredentials {
  username: string
  password: string
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  getUri(config?: AxiosRequestConfig): string
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}

export interface AxiosClassStatic {
  new (config: AxiosRequestConfig): Axios
}
export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean

  all<T>(promises: Array<T | Promise<T>>): Promise<T[]>

  spread<T, R>(callbackL: (...args: T[]) => R): (arr: T[]) => R

  Axios: AxiosClassStatic
}

//拦截器对象的接口
export interface AxiosInterceptorManager<T> {
  //返回一个id
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  //根据id删除拦截器
  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}
//实例类型
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  throwIfRequested(): void
}
export interface Canceler {
  (message?: string): void
}
export interface CancelExecutor {
  (cancel: Canceler): void
}
export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}
