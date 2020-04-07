

// 节流：如果频繁操作，在setTimeout未执行前就clearTimeout，则当前setTimeout就不会执行。
function throttle (method, duration) {
  let timer = null
  let startTime = new Date()

  return function () {
    let endTime = new Date()
    let self = this
    let args = arguments

    clearTimeout(timer)
    if (endTime - startTime >= duration) {
      method.apply(self, args)
      startTime = endTime
    } else {
      timer = setTimeout(function () {
        method.apply(self, args)
      }, duration)
    }
  }

}

/* 初始化图片懒加载，示例如下（注：一定要在dom渲染之后执行，且dom上需要加data-original的图片源链接）
  // dom--
  <img class="imgItem" :data-original="item.commodityImageList[0].imgUrl + '_!!240x240c3_80.jpg'" src="">
  <img class="imgItem" :data-original="item.commodityImageList[0].imgUrl + '_!!240x240c3_80.jpg'" src="">
  <img class="imgItem" :data-original="item.commodityImageList[0].imgUrl + '_!!240x240c3_80.jpg'" src="">
  <img class="imgItem" :data-original="item.commodityImageList[0].imgUrl + '_!!240x240c3_80.jpg'" src="">
  <img class="imgItem" :data-original="item.commodityImageList[0].imgUrl + '_!!240x240c3_80.jpg'" src="">
  <img class="imgItem" :data-original="item.commodityImageList[0].imgUrl + '_!!240x240c3_80.jpg'" src="">
  --

  // js调用
  this.$nextTick(() => {
    // 200：节流间隔(可不传，默认200ms)；debug：开启console调试(可不传,默认为false：不开启)
    lazyStart('.imgItem', 200, true)
  })
  //--

*/
function lazyStart (dom, duration = 200, debug = false) {
  let count = 0 // 计数使用

  coreMethod(dom, duration = 200, debug, (src) => {
    count++
    console.log('执行懒加载(第'+count+'张)，url：', src)
  })

  $(window).scroll(throttle(() => {

    coreMethod(dom, duration = 200, debug, (src) => {
      count++
      console.log('执行懒加载(第'+count+'张)，url：', src)
    })

  }, duration))
}

function coreMethod (dom, duration = 200, debug = false, callback) {
  let windowHeight = window.innerHeight
  let windowTop = window.pageYOffset

  $(dom).each(function () {

    var src = $(this).attr('data-original') || ''
    if (!src) { return }

    if ($(this).offset().top < windowHeight + windowTop) {

      // debug调试
      if (debug) {
        callback && callback(src)
      }

      let localName = $(this)[0].localName || 'img'
      if (localName === 'img') {
        $(this).attr('src', src)
        $(this).removeAttr('data-original')
      } else {
        $(this).css('background-image', 'url('+src+')')
        $(this).removeAttr('data-original')
      }

    }

  })
}

export {
  throttle,
  lazyStart,
}