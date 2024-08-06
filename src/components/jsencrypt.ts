// 解密加密模块
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'
import { publicKey, privateKey } from '@/api/key'
// 创建JSEncrypt实例
const encryptor = new JSEncrypt(); 
// 加密
export function encrypt(txt: string) {  
  encryptor.setPublicKey(publicKey);  
  try {  
    const encrypted = encryptor.encrypt(txt);  
    // console.log('Encrypted:', encrypted);  
    return encrypted;  
  } catch (error) {  
    console.error('Encryption failed:', error);  
    throw new Error("加密失败") // 或者返回 null、错误消息等，取决于你的需求  
  }  
}
// 解密
export function decrypt(txt:string) {
  encryptor.setPrivateKey(privateKey) // 设置私钥
  try {  
    const encrypted = encryptor.decrypt(txt) // 对数据进行解密 
    // console.log('Decrypt:', encrypted);  
    return encrypted;  
  } catch (error) {  
    console.error('Decrypt failed:', error);  
    throw new Error("解密失败"); // 或者返回 null、错误消息等，取决于你的需求  
  }  
  
}
