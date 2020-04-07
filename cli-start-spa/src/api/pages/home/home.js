
import gateWay from '@/config/gateway.config';
import { callApi } from '@/api/callApi';

const baseApi = gateWay.baseApi

const axios = callApi(baseApi);


// 获取数据列表
export function listPage (data) {
  return axios({
    url: `/getProject`,
    method: 'get',
    data: data
  })
}


