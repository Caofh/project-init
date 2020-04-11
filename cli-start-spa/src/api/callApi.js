/* eslint-disable */

import axios from 'axios' // 文档：http://www.axios-js.com/zh-cn/docs/#axios-create-config
import Qs from 'qs'

import { toQueryString } from '@/utils/common/url_query'


/* 自定义content-type方式示例如下，默认'content-type': 'application/json'
  const hostDev = baseHost.hostDev
  const axios_www = callApi(hostDev, {
    'content-type': 'application/x-www-form-urlencoded',
  });
*/
const callApi = (apiRoot = '/', headers) => {

  let obj = {}
  let axiosDefault = {
    baseURL: apiRoot,
    timeout: 20000,
    headers: {
      'content-type': 'application/json',
    },
  }

  let defHeaders = axiosDefault.headers

  // 合并传入的header和默认的header
  if (headers) {
    defHeaders = Object.assign(defHeaders, headers) // 合并header
  }

  // 整理最终headers
  axiosDefault.headers = defHeaders

  // 设置axios
  obj = axios.create(axiosDefault)

  // 添加请求拦截器
  obj.interceptors.request.use(config => {

    // 针对get参数做处理(兼容get情况传入data的情况)
    if (config.method == 'get' && config.data) {
      let paramsObj = config.params ? config.params : {}
      paramsObj = Object.assign(paramsObj, config.data)

      config.params = paramsObj
    }

    // 针对post模式对象做x-www-form-urlencoded处理
    if (config.data &&
      config.headers['content-type'] == 'application/x-www-form-urlencoded' &&
      Object.prototype.toString.call(config.data).slice(8, -1) == 'Object') {
      config.data = Qs.stringify(config.data)
    }

    // 针对post模式对象做form-data处理
    if (config.data &&
      config.headers['content-type'] == 'multipart/form-data' &&
      Object.prototype.toString.call(config.data).slice(8, -1) == 'Object') {

      let formData = new FormData()
      for (let key in config.data) {
        formData.append(key, config.data[key])
      }

      config.data = formData
    }

    return config
  }, err => {
    // 对请求错误做些什么
    return Promise.reject(err)
  })

  // 添加响应拦截器
  obj.interceptors.response.use(res => {
    
    let config = res.config // 请求相关信息
    let data = res.data // 返回数据
    let code = data.code || '' // 兼容code码

    // 判断登录信息是否过期(1006：upk过期；103：用户没登录)
    if (code == 1006 || code == 103) {
      console.log('---------')
      console.log('问题接口：' + (config.baseURL + config.url))
      console.log('问题返回：')
      console.log(data)
      console.log('---------')

      // 响应错误
      return Promise.reject(data)
    } else {
      console.log('---------')
      console.log('请求成功接口：' + (config.baseURL + config.url))
      console.log('返回数据：')
      console.log(data)
      console.log('---------')

      return data
    }

  }, err => {
    // 对响应错误做点什么
    return Promise.reject(err)
  })

  return obj
}

/* 封装jsonp请求，基于zepto，示例如下：
  let json = {
    url: 'https://pay.secoo.com/b2c/weixin/app/weixinYtAppPay.jsp',
    data: {
      orderid,
      upk
    }
  }
  callApi_jsonp(json).then((res) => {
    console.log(res)
  })
*/
const callApi_jsonp = (options) => {

  let url = options.url ? options.url : ''
  let data = options.data ? toQueryString(options.data) : ''

  return new Promise((resolve, reject) => {

    $.ajax({
      type: "GET",
      dataType: "jsonp",
      url: url,
      data: data,
      beforeSend: function () {
        // console.log('请求信息前')
      },
      success: function (res) {
        console.log('---------')
        console.log('请求成功接口：' + url)
        console.log('返回数据：')
        console.log(res)
        console.log('---------')

        resolve(res)
      },
      error: function (err) {
        console.log('---------')
        console.log('问题接口：' + url)
        console.log('问题返回：')
        console.log(err)
        console.log('---------')

        reject(err)
      }
    });

  })

}


export {
  callApi,
  callApi_jsonp,
}