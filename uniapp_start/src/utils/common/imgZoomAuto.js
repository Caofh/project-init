/**
 * Created by caofanghui on 17/6/17.
 */


/* 等比例缩放图片函数
  var obj = imgZoomAuto({
    oldWidth: 100,
    oldHeight: 200,
    newWidth: 150
  })
  或
  var obj = imgZoomAuto({
    oldWidth: 100,
    oldHeight: 200,
    newHeight: 300
  })

  console.log(obj)
  打印：
   obj = {
     oldWidth: oldWidth,
     oldHeight: oldHeight,
     newWidth: newWidth,
     newHeight: newHeight
   }

*/



function imgZoomAuto (option) {
  var oldWidth, oldHeight, newWidth, newHeight

  oldWidth = parseFloat(option.oldWidth) || ''
  oldHeight= parseFloat(option.oldHeight) || ''
  newWidth = parseFloat(option.newWidth) || ''
  newHeight = parseFloat(option.newHeight) || ''

  if (newWidth && !newHeight) {
    var time = newWidth / oldWidth,
      newHeight = Math.round(oldHeight * time),
      obj = {
        oldWidth: oldWidth,
        oldHeight: oldHeight,
        newWidth: newWidth,
        newHeight: newHeight
      }
  } else if (!newWidth && newHeight) {
    var time = newHeight / oldHeight,
      newWidth = Math.round(oldWidth * time),
      obj = {
        oldWidth: oldWidth,
        oldHeight: oldHeight,
        newWidth: newWidth,
        newHeight: newHeight
      }
  }

  return obj
}

export {
  imgZoomAuto
}