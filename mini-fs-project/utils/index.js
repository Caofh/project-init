
/* 封装公用方法 */
import { errMsg } from '../config/base_config'
let common = getApp().common

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

/* 对象参数参数按照ASCII排序
    let obj = {
        a: 1,
        key: 123,
        y: '哈哈哈',
    }
    console.log(objKeySort(obj))
 */
function objKeySort (arys) {
    //先用Object内置类的keys方法获取要排序对象的属性名数组，再利用Array的sort方法进行排序
    let newkey = Object.keys(arys).sort();
    // console.log('newkey=' + newkey);
    let newObj = ''; //创建一个新的对象，用于存放排好序的键值对
    for (let i = 0; i < newkey.length; i++) {
        //遍历newkey数组
        newObj += [newkey[i]] + '=' + arys[newkey[i]] + '&';
    }
    return newObj.substring(0, newObj.length - 1);
}

function failToast (err) {
    let msg = ''

    if (err.msg) {
        msg = err.msg
    } else {
        msg = errMsg
    }
    common.showToast(msg)
}



export {
    throttle,
    objKeySort,
    failToast,

}