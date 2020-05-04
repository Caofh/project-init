

import Base64 from './vender/function.js'
import base from './vender/base.js'

/*
调用方式：
  uploadOss.init({
    key: "events/" + (new Date).getTime() + '-' + file.name,
    file: document.getElementById('file').files[0],
    success: function (path) {
      console.log(path) // path为阿里云上的上传图片地址.
    },
    fail: function (error) {
      console.log(error) // 上传失败回调函数
    }
  })

  uploadOss.uploadFile() // 调用上传方法

  注：uploadOss.base64toBlob(base64) 方法为将base64的图片数据-》二进制的数据，再传到oss云上，可识别.(在canvas截图后使用)

 */
var uploadOss = {}

uploadOss.base = base // oss配置参数(id、secret等)
uploadOss.policyBase64 = '' // oss的policy
uploadOss.signature = '' // oss的签名
uploadOss.file = '' // 上传的文件
uploadOss.key = '' // 上传的文件路径
uploadOss.success = '' // 上传成功回调
uploadOss.fail = '' // 上传成功回调

uploadOss.init = function (option) {
  var key = option.key || '' // 上传路径
  var file = option.file || '' // 上传文件
  var success = option.success || ''
  var fail = option.fail || ''

  uploadOss.file = file // 上传的文件***
  uploadOss.key = key // 上传的文件路径***
  uploadOss.success = success // 上传成功回调***
  uploadOss.fail = fail // 上传失败回调***

  var POLICY_JSON = {
      "expiration": "2020-12-01T12:00:00.000Z",
      "conditions": [
        ["starts-with", "$key", ""],
        {"bucket": uploadOss.base.bucket},
        ["starts-with", "$Content-Type", ""],
        ["content-length-range", 0, 524288000]
      ]
  };
  var secret = uploadOss.base.secret;
  // console.log(Base64)
  var policyBase64 = Base64.encode(JSON.stringify(POLICY_JSON));
  uploadOss.policyBase64 = policyBase64 // oss的policy***
  // console.log(policyBase64)

  var signature = Base64.b64_hmac_sha1(secret, policyBase64);
  uploadOss.signature = signature // oss的签名***
  // console.log(signature);

}

uploadOss.helper = function () {

}

//XmlHttpRequest对象
uploadOss.createXmlHttpRequest = function (){
  if(window.ActiveXObject){ //如果是IE浏览器
    return new ActiveXObject("Microsoft.XMLHTTP");
  }else if(window.XMLHttpRequest){ //非IE浏览器
    return new XMLHttpRequest();
  }
}

// uploadOss.uploadProgress = function (evt) {
//   if (evt.lengthComputable) {
//     var percentComplete = Math.round(evt.loaded * 100 / evt.total);
//     document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
//   }
//   else {
//     document.getElementById('progressNumber').innerHTML = 'unable to compute';
//   }
// }

uploadOss.uploadComplete = function (evt) {
  /* This event is raised when the server send back a response */
  // console.log(evt)
  // console.log(evt.target.responseText)
  // alert("Done - " + evt.target.responseText );

  var path = 'https://' + uploadOss.base.bucket + '.' + uploadOss.base.region +  '.aliyuncs.com/' + uploadOss.key
  uploadOss.success && uploadOss.success(path)
}

uploadOss.uploadFailed = function (evt) {
  uploadOss.fail && uploadOss.fail(evt)
  // alert("There was an error attempting to upload the file." + evt);
}

uploadOss.uploadCanceled = function (evt) {
  alert("The upload has been canceled by the user or the browser dropped the connection.");
}

uploadOss.uploadFile = function () {
  // var file = document.getElementById('file').files[0];
  var file = uploadOss.file;
  // var key = "events/" + (new Date).getTime() + '-' + file.name;
  var key = uploadOss.key;
  // console.log(key);

  var fd = new FormData();
  fd.append('key', key);
  fd.append('Content-Type', file.type);
  fd.append('OSSAccessKeyId', uploadOss.base.OSSAccessKeyId);
  fd.append('policy', uploadOss.policyBase64)
  fd.append('signature', uploadOss.signature);
  fd.append("file",file);

  var xhr = uploadOss.createXmlHttpRequest()
  // xhr.upload.addEventListener("progress", uploadProgress, false); // 监听进度
  xhr.addEventListener("load", uploadOss.uploadComplete, false);
  xhr.addEventListener("error", uploadOss.uploadFailed, false);
  xhr.addEventListener("abort", uploadOss.uploadCanceled, false);

  xhr.open('POST', uploadOss.base.ossUrl, true); //MUST BE LAST LINE BEFORE YOU SEND
  xhr.send(fd);
}

// 将base64数据图片装换位二进制的blob数据，传到阿里云oss.
uploadOss.base64toBlob = function (base64) {
  var blob = uploadOss.toBlob.init(base64)

  return blob
}

uploadOss.toBlob = {
  init: function (base64) {
    // base64的dataURL
    const ImageURL = base64 || ''

    // Split the base64 string in data and contentType
    const block = ImageURL.split(";");

    // Get the content type of the image
    const contentType = block[0].split(":")[1]; // In this case "image/jpeg"

    // get the real base64 content of the file
    const realData = block[1].split(",")[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

    // Convert it to a blob to upload
    var blob = this.b64toBlob(realData, contentType);

    return blob
  },
  b64toBlob: function b64toBlob(b64Data, contentType='', sliceSize=512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
}


export default uploadOss


