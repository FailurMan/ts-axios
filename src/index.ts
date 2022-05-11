import { AxiosRequestConfig } from './types/index'
import { buildUrl } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
import xhr from './xhr'
function axios(config: AxiosRequestConfig): void {
  //处理config
  processConfig(config)
  //请求发送
  xhr(config)
}
//处理config参数
function processConfig(config: AxiosRequestConfig): void {
  //处理URL数据
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  //处理Data数据
  config.data = transformRequestData(config)
}
//处理URL
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}
//处理Data
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
//处理headers
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config

  return processHeaders(headers, data)
}
export default axios
