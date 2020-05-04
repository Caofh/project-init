
/*
  将url的传参参数形式的字符串转化为json对象格式

  let param = 'school=gongda&hobby=skating&number=3'
  let jsonObj = queryToObj(param)

  console.log(jsonObj)
  输出：{
          school: 'gongda',
          hobby: 'skaing',
          number: '3'
        }
*/
function queryToObj(str) {
  var theRequest = {};
  if (str) {
    var strs = str.indexOf('&') ? str.split("&") : str;
    for(let i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
    }
  }
  return theRequest;
}


/*
* 将obj转换成url参数形式
* toQueryString({a:1,b:2})  =>   a=1&b=2
*
* */
function toQueryPair(key, value) {
  if (typeof value == 'undefined'){
    return key;
  }
  return key + '=' + encodeURIComponent(value === null ? '' : String(value));
}
function toQueryString(obj) {
  var ret = [];
  for(var key in obj){
    key = encodeURIComponent(key);
    var values = obj[key];
    if(values && values.constructor == Array){//数组
      var queryValues = [];
      for (var i = 0, len = values.length, value; i < len; i++) {
        value = values[i];
        queryValues.push(toQueryPair(key, value));
      }
      ret = ret.concat(queryValues);
    }else{ //字符串
      ret.push(toQueryPair(key, values));
    }
  }
  return ret.join('&');
}


/*
  直接取url中的参数转为json（或者不转）
  用法：
   let para = urlToJson()
   console.log(para)

* */
function urlToJson () {
  const url = window.location.href

  const reg = /\?.*$/ // 正则取'？后的参数'
  const urlMatch = url.match(reg)

  // 匹配去掉？的纯参数(正则精髓，贪婪永远匹配最后一个？后的参数)
  const param = urlMatch && urlMatch.length ? urlMatch[0].replace(/^\?*.*\?/, '') : ''

  const output = {
    paramStr: param,
    paramJson: queryToObj(param)
  }

  return output
}

export {
  queryToObj,
  toQueryString,
  urlToJson
}