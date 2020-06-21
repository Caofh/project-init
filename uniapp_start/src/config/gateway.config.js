

// 当前构建环境
const env = process.env.VUE_APP_ENV
// console.log('env')
// console.log(selfEnv)


// 开发环境地址
const devHost = {
  // 接口地址域名相关
  baseApi: 'http://tpdoc.cn:3001',
  imgAddr: '/static/img',

}

// 测试环境地址
const testHost = {
  // 接口地址域名相关
  baseApi: 'http://tpdoc.cn:3001',
  imgAddr: 'http://erp.tpdoc.cn/uploads/image',

}

// 预发布环境地址
const preHost = {
  // 接口地址域名相关
  baseApi: 'http://tpdoc.cn:3001',
  imgAddr: 'http://erp.tpdoc.cn/uploads/image',

}

// 线上环境地址
const proHost = {
  // 接口地址域名相关
  baseApi: 'http://tpdoc.cn:3001',
  imgAddr: 'http://erp.tpdoc.cn/uploads/image',

}

let exportConfig = ''
if (env === 'production') {
  exportConfig = proHost
} else if (env === 'pre') {
  exportConfig = preHost
} else if (env === 'test') {
  exportConfig = testHost
} else {
  exportConfig = devHost
}

export default exportConfig


