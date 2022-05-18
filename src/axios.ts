import Axios from './code/Axios'
import { AxiosRequestConfig, AxiosStatic } from './types'
import { extend } from './helpers/util'
import defaults from './default'
import mergeConfig from './code/mergeConfig'
import CancelToken from './cancel/cancelToken'
import Cancel, { isCancel } from './cancel/Cancel'
//创建axios实例
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosStatic
}
const axios = createInstance(defaults)
//扩展axios.create方法
axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
