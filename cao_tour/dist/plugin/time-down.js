/**
 * Created by caofanghui on 17/5/30.
 */

/*时间倒计时方法(注：不能停止，没有停止方法，但可无限调用)
 调用方法：
 //时间倒计时示例
 var day = parseInt($('[node-type="countDown"]').find('.day').text()),
 hour = parseInt($('[node-type="countDown"]').find('.hour').text()),
 minite = parseInt($('[node-type="countDown"]').find('.minite').text()),
 second = parseInt($('[node-type="countDown"]').find('.second').text())

 common.countDown({
 day: day, //天数
 hour: hour, //小时数
 minite: minite, //分钟数
 second: second, //秒数
 callback: function (data) { //回调函数，每秒得到递减数组后执行回调函数
   console.log(data)
   $('[node-type="countDown"]').find('.day').text(data.day)
   $('[node-type="countDown"]').find('.hour').text(data.hour)
   $('[node-type="countDown"]').find('.minite').text(data.minite)
   $('[node-type="countDown"]').find('.second').text(data.second)
 }
 })
 //--
 */
function countDown (option) {
  let day = parseInt(option.day) || 0,
    hour = parseInt(option.hour) || 0,
    minite = parseInt(option.minite) || 0,
    second = parseInt(option.second) || 0,
    obj

  let loopTime = setInterval(function () {
    if (changeTime(second)) {
      if (changeTime(minite)) {
        if (changeTime(hour)) {
          if (changeTime(day)) {
            clearInterval(loopTime)
          } else {
            day--
            hour = 59
            minite = 59
            second = 59
          }
        } else {
          hour--
          minite = 59
          second = 59
        }
      } else {
        second = 59
        minite--
      }
    } else {
      second--
    }

    obj = {
      day: day,
      hour: hour,
      minite: minite,
      second: second
    }

    option.callback && option.callback(obj)

    //num为0返回true，不为0返回false
    function changeTime(num) {
      if (num) {
        return false
      } else {
        return true
      }
    }
  }, 1000)
}

export {
  countDown
}