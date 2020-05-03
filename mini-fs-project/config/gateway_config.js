/*
    接口地址host
*/

// 当前构建环境
const env = 'test'
// const env = 'production'

// 开发、测试环境地址
const devUrl = {
    hostApi: 'http://test.com', // 接口地址域名相关

}

// 线上环境地址
const proUrl = {
    hostApi: 'http://production.com', // 接口地址域名相关

}

export default env === 'production' ? proUrl : devUrl
