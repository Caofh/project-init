
//显示文本的一些相关信息（如文字数，字符数，实际文本长度）的方法-------------------------------------------------------------------------------------------------
/*
 函数说明：如number不传则返回word字符串所对应的字符数；若number传，则返回字符数的第number个所对应的实际字符串的索引值.
 调用方法
 var index = common.wordLimit(word, 5, 1)
 console.log(index)
 (word参数：需要做限制的字符串；
 number：当type=1时返回字符索引所对应的字符串索引;当type=2时返回汉字索引所对应的字符串索引;可选参数，为null返回字符串整体长度
 type：1是按照字符数返回，2是按照汉字数返回)
 */
//--------------------
function wordLimit (word, number, type) {
  try {
    var test = word,
      length = test.length,
      index = 0,
      type = type || 1

    for (var i = 0 ; i < length ; i++) {
      if (test.charCodeAt(i) < 256) {
        if (type && type == 1) {
          index += 1
        } else if (type && type == 2) {
          index += 0.5
        }

      } else if (test.charCodeAt(i) >= 256) {
        if (type && type == 1) {
          index += 2
        } else {
          index += 1
        }
      }

      if (number && number <= index) {
        return i
      }
    }
    return index
  } catch (e) {
    console.log(e.name + ": " + e.message)
  }
}

export {
  wordLimit
}

