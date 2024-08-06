// 备用
// 如果npm i --save-dev @types/js-cookie 没生效，可能没有找到该类型定义包的时候采用的
declare module 'js-cookie' {  
  // 假设 js-cookie 有一个 set 和 get 函数  
  export function set(name: string, value: string, options?: Cookies.CookieAttributes): void;  
  export function get(name: string): string | undefined;  
  export function remove(name: string, options?: Cookies.CookieAttributes): void;  
 
  // 假设 Cookies.CookieAttributes 是 js-cookie 使用的类型  
  // 注意：你可能需要根据实际情况调整这个接口  
  interface CookieAttributes {  
    expires?: number | Date;  
    path?: string;  
    domain?: string;  
    secure?: boolean;  
    httpOnly?: boolean;  // 注意：js-cookie 3.x 版本可能不支持 httpOnly  
    sameSite?: 'Strict' | 'Lax' | 'None' | boolean;  
  }  
}