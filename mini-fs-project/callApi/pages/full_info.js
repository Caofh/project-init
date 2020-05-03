
import { callApi } from '../callApi'
import gateWay from '../../config/gateway_config'

let hostApi = gateWay.hostApi // 接口域名

// 获取信息列表接口；
export function data_list (data) {
    return callApi({
        url: `${hostApi}/api/data_list`,
        method: 'get',
        data: data
    })
}
