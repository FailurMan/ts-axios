//实现请求逻辑

import { AxiosRequestConfig } from './types/index'
//发送请求模块
export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get', headers } = config
  const request = new XMLHttpRequest()
  //xhrReq.open(method, url, async:是否执行异步操作, user:可选的用户名, password:可选的用户名);
  request.open(method.toUpperCase(), url, true, null, null)
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })
  request.send(data)
}
