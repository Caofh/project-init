

/*
  将对象或者数组中的null值清除，返回一个最终对象或者数组
  let obj = {
    a: 1,
    b: 2,
    c: null
  }
  let arr = [1, 2, 3, null]

  obj_delete = deleteNull(obj)
  arr_delete = deleteNull(arr)

  console.log(obj_delete) // 输出{a: 1, b: 2}
  console.log(arr_delete) // 输出[1, 2, 3]

 */

function deleteNull (params) {
  let para

  console.log(params instanceof Object)
  console.log(params instanceof Array)

  if (params instanceof Array) {
    para = []

    for (let i = 0; i < params.length; i++) {
      if (params[i] !== null && params[i]) {
        para[i] = params[i]
      }
    }

  } else if (params instanceof Object) {
    para = {}

    for (let key in params) {
      if (params[key] !== null && params[key]) {
        para[key] = params[key]
      }
    }

  }

  return para
}

export {
  deleteNull
}