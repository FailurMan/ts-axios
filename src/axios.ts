import Axios from './code/Axios'
import { AxiosInstance } from './types'
import { extend } from './helpers/util'
//创建axios实例
function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}
const axios = createInstance()
export default axios
