//实现请求逻辑

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
//发送请求模块
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      //单位ms,默认是0
      request.timeout = timeout
    }
    //xhrReq.open(method, url, async:是否执行异步操作, user:可选的用户名, password:可选的用户名);
    request.open(method.toUpperCase(), url!, true, null, null)
    //ajax的onreadystatechange核心
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        return
      }
      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? request.response : request.responseType
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: parseHeaders(responseHeaders),
        config,
        request
      }
      handleResponse(response)
    }
    //网络错误处理
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }
    //超时处理
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)

    //错误处理:处理response的情况
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
