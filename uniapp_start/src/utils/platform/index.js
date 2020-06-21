
/*
  兼容多端相关代码
*/

import gateWay from '@/config/gateway.config.js'
import { env } from '@/config/base.config.js'
import { reg_url } from '@/utils/common/regRules.js'

/*
  let imgUrl = getImgUrl('logo') // 获取template模版中的图片
  let imgUrl = getImgUrl('logo', 'bg') // 获取背景图片

  // 带目录结构的图片
  let imgUrl = getImgUrl('home/logo') // 获取template模版中的图片
  let imgUrl = getImgUrl('home/logo', 'bg') // 获取背景图片
*/
function getImgUrl(url, type = '') {
  let imgUrl = `${gateWay.imgAddr}/${url}`
  // #ifdef MP-WEIXIN
  
  // #endif

  // #ifdef MP-TOUTIAO

    //  当是本地开发环境，并且不是cdn资源引用时启用。解决头条小程序背景图片必须加 ./static/*** 的问题
    if ( env === 'development' ) {
      if (!reg_url.test(gateWay.imgAddr)) {
        imgUrl = type === 'bg' ? `.${imgUrl}` : imgUrl
      }
    }

  // #endif

  return imgUrl

}



export {
  getImgUrl,
}
