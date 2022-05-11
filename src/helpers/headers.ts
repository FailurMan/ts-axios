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
