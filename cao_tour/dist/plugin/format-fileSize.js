/**
 * Created by caofanghui on 17/5/26.
 */

/*
将文件大小格式化为自适应大小单位方法：
 参数：文件大小的 B（比特）单位的数值
 例子：
 var fileSize = 1024 * 1024; // 以比特为单位的文件大小
  var fileSizeNew = formatFile(fileSize)
  console.log(fileSizeNew) // 输出1.00MB (因为(1024 * 1024)B 等于 1M)
  
 */
function formatFile(value){
  if(null == value || value == ''){
    return "0 Bytes";
  }
  var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
  var index = 0,
  srcsize = parseFloat(value);
  index = Math.floor(Math.log(srcsize) / Math.log(1024));
  var size = srcsize / Math.pow(1024, index);
  //  保留的小数位数
  size = size.toFixed(2);
  return size + unitArr[index];
}

export {
  formatFile
}