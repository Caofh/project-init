/**
  * 请求接口封装
  * @param {*}
  * json 配置参数的对象
  * json对象包括{url, method, data, header}
  */

 // 封装接口请求、响应拦截
 function callApi (json) {
 
  // 用户接口数据打印
  let debug = true

  let para = json || {}
  para.url = json.url || ''
  if (!para.url) throw new Error('请填写有效的url')

  para.method = json.method || 'GET'
  para.data = json.data || {}
  para.header = json.header || {}
  para.contentType = json.contentType || ''

  // 默认是'application/json'模式
  let contentType = {
    'content-type': 'application/json'
  }

  // 可自定义覆盖默认的'application/json'模式（如：contentType: 'application/x-www-form-urlencoded'）
  if (para.contentType) {
    contentType['content-type'] = para.contentType
  }


  // 合并传入的header、header头 和 渠道等基础header信息
  let header = Object.assign(para.header, contentType )
  para.header = header

  return new Promise((resolve, reject) => {

    uni.request({
      url: json.url,
      method: json.method.toUpperCase(),
      data: json.data,
      dataType: json.dataType || 'json',
      header,
      success (res) {
        // debug 打印请求的详情
        if (debug) {
          console.log('请求地址：', json.url)
          console.log('请求参数：', json.data)
          console.log('返回数据：', res)
        }

        const status = res.statusCode // 小程序返回code码
        if (status === 200) {
          let data = res.data // 接口返回的真实数据
          let code = getAPICode(data) // 返回码兼容

          // 接口返回code码
          /**
           * 0-成功
           */
          if (code == 0 || code == 200) {
            resolve(data)

          } else {
             reject(data)
 
             // 接口请求异常，打印出来，以便定位问题
             outputErr(json.url, json.data, res)

          }

        } else if (status === 401 || status === 403) {
          // 接口请求异常，打印出来，以便定位问题
          console.log('权限问题跳转登录页，详细接口信息如下：')
          outputErr(json.url, json.data, res)

        } else {
          // 业务异常
          reject(res.data)

          // 接口请求异常，打印出来，以便定位问题
          outputErr(json.url, json.data, res)
        }
      },
      fail (e) {
        reject(e)

        // 接口请求异常，打印出来，以便定位问题
        outputErr(json.url, json.data)
      }
    })

  })
}

function outputErr (url, data, res) {
  console.log('接口请求异常：-----------')
  console.log('请求地址：', url)
  console.log('请求参数：', data)
  console.log('返回数据：', res)
  console.log('---------------')
}

// 返回码兼容
function getAPICode(data){
  let code = '';

  if (data.code) {
     code = data.code

   }

   return code
}

export {
  callApi
}
