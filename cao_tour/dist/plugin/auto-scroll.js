//页面滚动按请求动画帧自动滚动
/*
 调用方法：
 var option = {
 type: 'up', //类型，向上滚动还是向下滚动，'up'或'down'两种
 startHeight: 30, //起始高度
 endHeight: 100, //终止高度
 speed: 100  //滚动速度.
 }
 common.auto_scroll(option)
 */
let auto_scroll = function (option) {
  var startHeight = option.startHeight
  var endHeight = option.endHeight

  if (option.type == 'up') {
    requireMove()
  } else if (option.type == 'down') {
    requireMoveDown()
  }

  function requireMove () {
    if (window.requestAnimationFrame) {
      requestAnimationFrame(function () {
        if (startHeight <= 10) {
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
        if (endHeight - startHeight <= 10) {
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
      window.scrollTop(0, endHeight)
    }
  }
}

export {
  auto_scroll
}