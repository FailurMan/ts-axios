import Axios from './code/Axios'
import { AxiosInstance, AxiosRequestConfig } from './types'
import { extend } from './helpers/util'
import defaults from './default'
//创建axios实例
function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}
const axios = createInstance(defaults)
export default axios
