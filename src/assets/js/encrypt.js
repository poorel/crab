import CryptoJS from 'crypto-js'
function getAesString(data,key,iv){//加密
  var key  = CryptoJS.enc.Utf8.parse(key);
  var iv   = CryptoJS.enc.Utf8.parse(iv);
  var encrypted =CryptoJS.AES.encrypt(data,key,
    {
      iv:iv,
      mode:CryptoJS.mode.CBC,
      padding:CryptoJS.pad.Pkcs7
    });
  return encrypted.toString();    //返回的是base64格式的密文
}
function getDAesString(encrypted,key,iv){//解密
  var key  = CryptoJS.enc.Utf8.parse(key);
  var iv   = CryptoJS.enc.Utf8.parse(iv);
  var decrypted =CryptoJS.AES.decrypt(encrypted,key,
    {
      iv:iv,
      mode:CryptoJS.mode.CBC,
      padding:CryptoJS.pad.Pkcs7
    });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

function getAES(data){ //加密
  var data = data.toString();
  var key  = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';  //24位密钥
  var iv   = '06291257';
  var encrypted =getAesString(data,key,iv); //密文
  // var encrypted1 =CryptoJS.enc.Utf8.parse(encrypted)
  // encrypted = encodeURIComponent(encrypted)
  // console.log(data+"加密"+encrypted)
  return encrypted;
}

function getDAes(data){//解密
  // var data = encodeURI(data)
  var key  = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';  //密钥
  var iv   = '06291257'; //8位目前正常
  var decryptedStr =getDAesString(data,key,iv);
  return decryptedStr;
}

export {
  getAES,
  getDAes
}
