declare module 'jsencrypt/bin/jsencrypt.min' {  
  class JSEncrypt {  
    constructor(options?: any);  
    getKey(): string;  
    setPublicKey(publicKey: string): void;  
    setPrivateKey(privateKey: string): void;  
    encrypt(data: string): string;  
    decrypt(data: string): string;  
    // 根据 JSEncrypt 的实际 API 添加更多方法  
  }  
  export = JSEncrypt;  
}