
//返回传递给他的任意对象的类(返回：array、object、number、string)
function typeOf(o) {
  if (o === null) return "Null";
  if (o === undefined) return "Undefined";

  return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
}

// 坐标像素转换(count:设计图(750)上的px值)，设计图的px => 真实dom中的px
function changePx(count) {
  const winWidth = window.screen.width;
  const ratio = winWidth / 750; // 比例
  return count * ratio;
}

// 防抖中心思想：如果频繁操作，在setTimeout未执行前就clearTimeout，则当前setTimeout就不会执行。
function debounce (method, delay) {
  let timer = null
  return function () {
    let self = this,
        args = arguments

    timer && clearTimeout(timer)
    timer = setTimeout(function () {
      method.apply(self, args)


    }, delay)

  }

}

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

/* H5设置本地存储(示例如下)
  1. h5.setStorage('20191111_game_v1', '哈哈哈')
  2. h5.setStorage('20191111_game_v1', {a:1, b:2})
 */
function setStorage(key, value) {
  if (!/^c2c_.*/.test(key)) {
    throw new Error('c2c项目设置localStorage的key值必须以"c2c_"开头，请修改!')
    return false
  }

  const v = typeOf(value) === 'string' ? value : JSON.stringify(value) || '';
  localStorage.setItem(key, v);
}

/* H5删除本地存储(示例如下)
  h5.removeStorage('20191111_game_v1')
 */
function removeStorage(key) {
  localStorage.getItem(key) && localStorage.removeItem(key);
}

/* H5获取本地存储(示例如下)
  1. let data = h5.getStorage('20191111_game_v1')
  2. let data = h5.getStorage('20191111_game_v1', 'deviceId')
  console.log(data)
 */
function getStorage(key, subKey) {
  let res = '';
  const stringLocal = localStorage.getItem(key) || '';
  let parseLocal = '';

  try {
    parseLocal = JSON.parse(stringLocal);
  } catch (error) {
    parseLocal = stringLocal;
  }

  // 区分是否有subKey
  if (!subKey) {
    res = parseLocal;
  } else {
    if (typeOf(parseLocal) === 'object') {
      res = parseLocal[subKey] || '';
    }
  }

  return res;
}

// 判断是否是pc端
function isPC(){
  let userAgentInfo = navigator.userAgent;
  let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
  }
  return flag;
}

//设置页面rem
function setRem (baseVal = 10) {
  const win = window
  const doc = document

  const docEl = doc.documentElement
  const resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize'
  const recalc = () => {
    let clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = (clientWidth / baseVal) + 'px'
  }
  recalc()
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
}


export {
  typeOf,
  changePx,
  debounce,
  throttle,
  setStorage,
  getStorage,
  removeStorage,
  isPC,
  setRem,
};
