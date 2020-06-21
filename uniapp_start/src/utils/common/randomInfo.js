
// 取0-n之间的随机整数
/*
  const ran = getRandom(9)
  console.log(ran); //打印：0-9之间的随机整数(不包含9)
 */
function getRandom (n) {
  return Math.floor(Math.random() * n)
}

/// 得到一个数组，内部数字随机且不重复(length:数组长度；range:随机范围)
/*
  const ranArr = getNorepeatArr(3, 9)
  console.log(ranArr); //打印：0-9之间的随机整数(不包含9) 的 包含3项的数组
*/
function getNorepeatArr (length, range) {
  if (parseInt(range) < parseInt(length)) {
    throw new Error('getNorepeatArr参数错误：range不可小于length')
    return false
  }

  var arr = []
  for (var i = 0; true; i++) {
    var random = getRandom(range)
    if (arr.indexOf(random) < 0) {
      arr.push(random)
    }

    if (arr.length >= length) {
      break;
    }

  }

  return arr
}

export {
  getRandom,
  getNorepeatArr
}