import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildUrl } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders, flattenHeaders } from '../helpers/headers'
//主函数
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  //处理config
  processConfig(config)
  //请求发送并对data进行处理
  return xhr(config).then(res => transformResponseData(res))
}
//处理config参数
function processConfig(config: AxiosRequestConfig): void {
  //处理URL数据
  //@ts-ignore
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  //处理Data数据
  config.data = transformRequestData(config)
  //再次处理请求头，删除不要的数据
  config.headers = flattenHeaders(config.headers, config.method!)
}
//处理URL
function transformURL(config: AxiosRequestConfig): string | void {
  const { url, params } = config
  return buildUrl(url!, params)
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
//处理data
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
