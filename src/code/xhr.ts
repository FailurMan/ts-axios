//实现请求逻辑

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import { isFormData } from '../helpers/util'
import cookie from '../helpers/cookie'
//发送请求模块
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config
    const request = new XMLHttpRequest()

    //xhrReq.open(method, url, async:是否执行异步操作, user:可选的用户名, password:可选的用户名);
    request.open(method.toUpperCase(), url!, true, null, null)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()
    //发送请求
    request.send(data)
    //配置请求
    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }
      if (timeout) {
        //单位ms,默认是0
        request.timeout = timeout
      }

      //跨域配置
      if (withCredentials) {
        request.withCredentials = true
      }
    }
    //添加事件
    function addEvents(): void {
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
      //下载结果
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    //对于头信息的处理
    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }
      //如果允许跨域且在同源又含有cookiename的情况
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    //对于取消逻辑的处理
    function processCancel(): void {
      //取消请求
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }
    //错误处理:处理response的情况
    function handleResponse(response: AxiosResponse): void {
      if (!validateStatus || validateStatus(response.status)) {
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
