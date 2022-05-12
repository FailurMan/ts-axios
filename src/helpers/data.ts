import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    //字符串不一定是json类型
    try {
      data = JSON.parse(data)
    } catch (err) {
      //do nothing
    }
  }
  return data
}
