


// 所有页面的路由守卫，在页面载入前的校验
function check () {
  let checkhMark = true
  // console.log('check测试')

  // let href = window.location.href
  // let reg = /html/g
  // if (!reg.test(href)) {
  //   patchMark = false
  //
  //   throw new Error('url链接必须以html结尾，目的为自动获取埋点的唯一识别标识：o.paid')
  // }


  return checkhMark
}


export {
  check
}