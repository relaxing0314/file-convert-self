// 判断数据类型
function isType(type) {
  return function (val) {
    if (Object.prototype.toString.call(val) === `[object ${type}]`) {
      return true
    }
    return false
  }
}
var isFun = isType('Function')

var FileConvert = {
  // file文件转blob url
  fileToBlob(files, callback) {
    var result = [];
    for(var i = 0; i < files.length; i++) {
      var blobUrl = URL.createObjectURL(files[i]);
      result.push(blobUrl)
    }
    if(isFun(callback)) {
      callback(result)
    }
    return result;
  },
  // file文件转base64
  blobToBase(blobs, callback) {
    var result = [];
    for(var i = 0; i < blobs.length; i++) {
      var reader = new FileReader();
      reader.onload = function (evt) {
        var base64 = evt.target.result;
        result.push(base64);
      };
      reader.readAsDataURL(blob);
    }
    if(isFun(callback)) {
      callback(result)
    }
    return result;
  },
  // file文件转换为base64，得到base64格式
  fileToBase64(files, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    var base64File;
    reader.onload = function() {
      base64File = reader.result;
      if(isFun(callback)) {
        callback(reader.result)
      }
    };
    return base64File;
  },
  // base64转换为file
  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  },
  // base64转换为blob流
  dataURItoBlob(base64Data, mimeType) {
    // console.log(base64Data); // data:image/png;base64,
    var byteString, mimeString;
    var base64DataArr = base64Data.split(',');
    if (base64DataArr.length == 1) {
      byteString = atob(base64Data); // base64 解码
    } else {
      if(base64DataArr[0].indexOf('base64') >= 0) {
        byteString = atob(base64DataArr[1]); // base64 解码
      } else {
        byteString = unescape(base64DataArr[1]);
      }
      mimeString = base64DataArr[0].split(':')[1].split(';')[0]; // mime类型 -- image/png
    }
    // var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
    // var ia = new Uint8Array(arrayBuffer);//创建视图
    var ia = new Uint8Array(byteString.length);//创建视图
    for(var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ia], {
      type: mimeString || mimeType || 'application/octet-stream'
    });
    return blob;
  },
  // blob流转换为base64
  blobToDataURI(blob, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    var base64FileData;
    reader.onload = function (e) {
      base64FileData = e.target.result
      if(isFun(callback)) {
        callback(e.target.result);
      }
    }
    return base64FileData;
  },
  // arrayBuffer格式转换为base64格式
  arrayBufferToBase64(arrayBufferData) {
　　let byteArray = new Uint8Array(arrayBufferData);
    for (let i = 0; i < byteArray.byteLength; i++) {
      binary += String.fromCharCode(byteArray[i]);
    }
    // let base64Url = 'data:application/pdf;base64,'+　window.btoa(binary); // base64
    let base64Url = window.btoa(binary); // base64
    return base64Url;
  },
  // arrayBuffer格式转换为blob格式
  arrayBufferToBlob(arrayBufferData) {
　　let blobData = new Blob([arrayBufferData], {type: 'application/octet-stream'})
    return blobData;
  }
}

module.exports = FileConvert;