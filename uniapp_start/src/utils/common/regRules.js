
const reg_emailAddress = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/  // 邮箱正则
const reg_space = /\s+/g // 匹配所有空格
const reg_phoneNumber = /^1\d{10}$/ // 电话号码
const reg_url = /^http(s)?:\/\/.*$/ // 链接的正则，如：(http(s)://www.baidu.com)
const reg_number = /^[+-]?\d+(\.\d+|\.)?$/ //数字正则（带有小数点）
const reg_number_nopoint = /^[0-9]*$/ //数字正则（不带小数点）
const reg_word_cn = /^[\u4e00-\u9fa5]*$/ // 匹配中文汉字

// 添加收货地址使用-----
const reg_name = /^[A-Za-z0-9|\u4e00-\u9fa5]*$/ // 匹配中英文不含空格(收货人)
const reg_address_info = /[\u4e00-\u9fa5]+/ // 匹配至少含有一个中文(地址详情)
// -----

const reg_logistic = /^[A-Za-z0-9]+$/ // 纯数字+字母校验（物流单号）
const reg_special_word_en = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im // 英文特殊字符
const reg_special_word_cn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im  // 中文特殊字符

const reg_ID_card = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/

export {
  reg_emailAddress,
  reg_space,
  reg_phoneNumber,
  reg_url,
  reg_number,
  reg_number_nopoint,
  reg_word_cn,
  reg_name,
  reg_address_info,
  reg_ID_card,
  reg_logistic,
  reg_special_word_en,
  reg_special_word_cn
}
