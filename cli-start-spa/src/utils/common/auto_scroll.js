//页面滚动按请求动画帧自动滚动
/*
 调用方法：
 var option = {
    type: 'up;, //类型，向上滚动还是向下滚动，'up'或'down'两种
    startHeight: startTop, //起始高度
    endHeight: endTop, //终止高度
    time: 20  // 想要在多少个ifram帧内滚动完毕.
 }
 common.auto_scroll(option)
 */
function auto_scroll(option) {
  var startHeight = option.startHeight
  var endHeight = option.endHeight

  option.speed = Math.abs(startHeight - endHeight)  / option.time

  if (Math.abs(startHeight - endHeight) < option.speed) return

  if (option.type == 'up') {
    requireMove()
  } else if (option.type == 'down') {
    requireMoveDown()
  }

  function requireMove () {
    if (window.requestAnimationFrame) {
      requestAnimationFrame(function () {
        if (startHeight - endHeight <= 50) {
          startHeight--
        } else {
          startHeight = startHeight - option.speed
        }

        window.scrollTo(0, startHeight)

        if (startHeight > endHeight) {
          requireMove()
        }
      })
    } else {
      window.scrollTo(0, endHeight)
    }
  }

  function requireMoveDown () {
    if (window.requestAnimationFrame) {
      requestAnimationFrame(function () {
        if (endHeight - startHeight <= 50) {
          startHeight++
        } else {
          startHeight = startHeight + option.speed
        }

        window.scrollTo(0, startHeight)

        if (startHeight < endHeight) {
          requireMoveDown()
        }
      })
    } else {
      window.scrollTo(0, endHeight)
    }
  }
}

/* 触底函数
  let allHeight = $('.container').height()
  scrollDown({
    allHeight: allHeight,
    buffer: 100,
    type: 'down', // down触底、up:触顶（选填，默认触底）
  }).then(() => {
    console.log('触底')

  })
*/
function scrollDown(option) {
  return new Promise((resolve, reject) => {

    let allHeight = option.allHeight || ''
    let buffer = option.buffer || 50 // 预加载缓冲像素
    let type = option.type || 'down' // 预加载缓冲像素

    if (type === 'down' && !allHeight) return

    let windowHeight = window.innerHeight
    let windowTop = window.pageYOffset

    if (type === 'down') {
      // 触底判断
      if (allHeight - windowHeight - buffer <= windowTop) {
        // callBack && callBack()
        resolve()
      }

    } else {
      // 触顶判断
      if (windowTop <= buffer) {
        resolve()
      }

    }


  })
}



/**
 *
 * 缓动动画
 * @param {Number} position         当前滚动位置
 * @param {Number} destination      目标位置
 * @param {Number} rate             缓动率（值越大，滚动越慢，值越小，滚动越快）
 * @param {Function} callback       缓动结束回调，第一个参数为当前的位置，第二个参数为动画是否结束
 */
function easeout(position, destination = 0, rate = 5, callback) {
  // 如果输入的目标位置和滚动的起始位置相同或者输入的不是数字类型则不进行滚动动画
  if (position === destination || typeof destination !== 'number') {
    return false
  }

  // 如果不能使用原生requestAnimationFrame,用setTimeout代替
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (fn) => {
      return setTimeout(fn, 17)
    }
  }

  const step = () => {
    position = position + (destination - position) / rate
    if (Math.abs(destination - position) < 1) {
      callback(destination, true)
      return
    }
    callback(position, false)
    requestAnimationFrame(step)
  }

  step()
}

function scrollSmooth(destination, rate) {
  // 当前页面滚动高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  easeout(scrollTop, destination, rate, (val) => {
    window.scrollTo(0, val)
  })
}

export {
  auto_scroll,
  scrollDown,
  scrollSmooth
}