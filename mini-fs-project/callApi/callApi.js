
import { objKeySort } from '../utils/index'
import md5 from '../utils/plugins/md5.min'
import { appid, secret } from '../config/base_config'

// 封装接口请求、响应拦截
function callApi(json) {

    // 用户接口数据打印
    let debug = false

    let para = json || {}
    para.url = json.url || ''
    if (!para.url) throw new Error('请填写有效的url')

    para.method = json.method || 'GET'
    para.data = json.data ? addSign(json.data) : {} // 增加后端所需校验参数
    para.dataType = json.dataType || 'json'
    para.header = json.header || {}
    para.contentType = json.contentType || ''
    para.responseType = json.responseType || 'text'

    para.success = json.success || ''

    // 默认是'application/json'模式
    let contentType = {
        'content-type': 'application/json'
    }
    // 可自定义覆盖默认的'application/json'模式（如：contentType: 'application/x-www-form-urlencoded'）
    para.contentType && (contentType['content-type'] = para.contentType)

    // 合并传入的header、header头 和 渠道等基础header信息
    let header = Object.assign(para.header, contentType)
    para.header = header

    if (para.success) {
        // 返回常规模式request数据
        return normalData(para, debug)

    } else {
        // 返回promise模式数据
        return promiseData(para, debug)
    }
}

// 返回promise模式的接口封装
function promiseData (para, debug) {
    return new Promise((resolve, reject) => {

        tt.request({
            url: para.url,
            method: para.method.toUpperCase(),
            data: para.data,
            dataType: para.dataType,
            header: para.header,
            responseType: para.responseType || 'text',
            success(res) {
                const status = res.statusCode // 小程序返回code码
                if (status === 200) {
                    let data = res.data // 接口返回的真实数据
                    let status = data.status // 返回码兼容

                    if (String(status) === '0') {
                        // debug 打印请求的详情；接口请求成功，打印出来
                        debug && output(para.url, para.data, res, 'success')

                        resolve(data)
                    } else {
                        // 接口请求异常，打印出来，以便定位问题
                        output(para.url, para.data, res)

                        reject(data)
                    }

                } else if (status === 401 || status === 403) {

                    console.log('小程序请求报，小程序权限问题')
                    // 接口请求异常，打印出来，以便定位问题
                    output(para.url, para.data, res)

                    reject(res)


                } else {
                    // 业务异常
                    reject(res)

                    // 接口请求异常，打印出来，以便定位问题
                    output(para.url, para.data, res)
                }
            },
            fail(e) {
                reject(e)

                // 接口请求异常，打印出来，以便定位问题
                output(para.url, para.data)
            }
        })

    })
}

function normalData (para, debug) {
    return tt.request({
        url: para.url,
        method: para.method.toUpperCase(),
        data: para.data,
        dataType: para.dataType,
        header: para.header,
        responseType: para.responseType || 'text',
        success(res) {

            const status = res.statusCode // 小程序返回code码
            if (status === 200) {
                let data = res.data // 接口返回的真实数据
                let status = data.status // 返回码兼容

                if (String(status) === '0') {
                    // debug 打印请求的详情；接口请求成功，打印出来
                    debug && output(para.url, para.data, res, 'success')

                    para.success && para.success(data)
                } else {
                    // 接口请求异常，打印出来，以便定位问题
                    output(para.url, para.data, res)

                    para.fail && para.fail(data)
                }

            } else if (status === 401 || status === 403) {

                console.log('小程序请求报，小程序权限问题')
                // 接口请求异常，打印出来，以便定位问题
                output(para.url, para.data, res)

                para.fail && para.fail(res)


            } else {
                // 业务异常
                para.fail && para.fail(res)

                // 接口请求异常，打印出来，以便定位问题
                output(para.url, para.data, res)
            }

        },
        fail(e) {
            para.fail && para.fail(e)

            // 接口请求异常，打印出来，以便定位问题
            output(para.url, para.data)
        }
    })
}

function output(url, data, res, type = 'fail') {
    type === 'success' && console.log('接口请求成功：-----------')
    type === 'fail' && console.log('接口请求异常：-----------')
    console.log('请求地址：', url)
    console.log('请求参数：', data)
    console.log('返回数据：', res)
    console.log('---------------')
}

/* 接口加密token算法，给请求参数增加sign参数
    let obj = {
        id: 1,
        key: 123,
        content: '哈哈哈',
    }
    addSign(obj)
    输出：
    {
        id: 1,
        key: 123,
        content: '哈哈哈',
        appid: '123456',
        timestamp: '987678867',
        sign: '8dde8cfe77595b95c37e26bb8920c4a7',
    }
 */
function addSign (data) {
    data.appid = appid
    data.timestamp = Math.floor(new Date().getTime() / 1000)

    let dataSort = objKeySort(data) + secret
    data.sign = md5(dataSort)
    // console.log(dataSort)

    return data
}



export {
    callApi,
}