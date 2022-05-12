import { isPlainObject } from './util'

function normalizeHeaderName(headers: any, normalizeHeaderName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(item => {
    if (item !== normalizeHeaderName && item.toUpperCase() === normalizeHeaderName.toUpperCase()) {
      headers[normalizeHeaderName] = headers[item]
      delete headers[item]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-type']) {
      headers['Content-type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
//将header转换成对象格式
export function parseHeaders(headers: string): string {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLocaleUpperCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}
