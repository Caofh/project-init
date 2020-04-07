/*
  基础信息配置文件
 */

// 全局错误提示
const errMsg = '网络错误，请稍后重试~'

// 需要的第三方插件url集合
const sourceJs = {
  eruda: {
    name: 'eruda', //页面调试工具；文档：https://github.com/liriliri/eruda
    global: 'eruda',
    ver: '0.0.1',
    isLoad: true,
    cache: false,
    src: 'https://mstatic.secooimg.com/activity2018/js/comm/eruda.min.js'
    // src: 'https://cdn.jsdelivr.net/npm/eruda'
  },
  zepto: {
    name: 'zepto', // zepto；文档：https://github.com/madrobby/zepto
    global: 'Zepto', // 第三方插件的全局变量名，用于避免重复加载
    ver: '0.0.1',
    isLoad: true,
    cache: false,
    src: 'https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js'
  },
  moment: { // 文档：http://momentjs.cn/
    name: 'moment',
    global: 'moment', // 第三方插件的全局变量名，用于避免重复加载
    ver: '0.0.1',
    isLoad: true,
    cache: false,
    src: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js'
  },
}

export {
  errMsg,
  sourceJs,
}
