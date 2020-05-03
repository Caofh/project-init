
import { callApi } from '../callApi'
import gateWay from '../../config/gateway_config'

let hostApi = gateWay.hostApi // 接口域名

// 获取转正信信息接口；
export function letter (data) {
    return callApi({
        url: `${hostApi}/employee/letter`,
        method: 'get',
        data: data
    })
}
