
import gateWay from '../../../config/gateway.config.js';
import { callApi } from '../../callApi.js';

const baseApi = gateWay.baseApi

// 获取小程序首页产品列表
export function listPage (data) {
  return callApi({
    url: `${baseApi}/getProject`,
    method: 'get',
    data: data
  })
}

