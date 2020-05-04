
const emailAddress = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/  // 邮箱正则
const space = /\s+/g // 匹配所有空格
const upaiyun = /^(\/\/mstore.b0.upaiyun.com|http(s)?:\/\/mstore.b0.upaiyun.com|http(s)?).*$/ // 匹配又拍云正则
const number = /^[+-]?\d+(\.\d+|\.)?$/ //数字正则（带有小数点）
const number_nopoint = /^[0-9]*$/ //数字正则（不带小数点）
const word_cn = /^[\u4e00-\u9fa5]*$/ // 匹配中文汉字
const word_eg = /^\w*$/ // 匹配英文字符及0-9，等价于“[A-Za-z0-9_]”
const word_cn_eg = /^[\u4e00-\u9fa5|[A-Za-z]*$/ // 匹配中英文
const phone_number = /^1[34578]\d{9}$/ // 电话号码
const telephone_v1 = /^[0-9]{0,4}$/ // 座机-区号-4位
const telephone_v2 = /^[0-9]{7,11}$/ // 座机-号码-7-11位
const telephone_v3 = /^[0-9]{0,6}$/ // 座机-分机号-最多6位
const zip_code = /[1-9]\d{5}(?!\d)/ // 邮编正则
const zip_code_new = /^[1-9]\d{5}/ // 新邮编正则
const safeCode = /^[0-9]{6}/ // 安全码正则验证（6位纯数字）
//const url = /^[A-Za-z]+:\/\/[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$/ // 链接的正则，如：(http(s)://www.baidu.com)
const url = /^http(s)?:\/\/.*$/ // 链接的正则，如：(http(s)://www.baidu.com)




export {
  emailAddress,
  space,
  upaiyun,
  number,
  number_nopoint,
  word_cn,
  word_eg,
  word_cn_eg,
  phone_number,
  telephone_v1,
  telephone_v2,
  telephone_v3,
  zip_code,
  zip_code_new,
  safeCode,
  url
}