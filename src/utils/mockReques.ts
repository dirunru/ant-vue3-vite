import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { SUCCESS_CODE } from '@/common/type'
import { message } from 'ant-design-vue'
import { useSeverLoadingStore } from '@/stores/severLoading' // 引入定义的myLoading 

const token = localStorage.getItem('token');  
const config = {
  baseURL: '/mock',
  timeout: 10000,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` // 从本地存储中获取 token 并设置到请求头中 
  }
}

class CancelControl {
  /* 构造函数 */
  constructor() {
    this.allCancelApi = {}
  }
  /* 此方法记录请求函数 calcelAPI:接口名称或者url */
  setAbortAPI(calcelAPI:string): axios.CancelToken {
    // 1、创建取消标记
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    this.allCancelApi[calcelAPI] = source
    return source.token
  }
  /* 执行此方法取消请求 calcelAPI:接口名称或者url */
  abort(calcelAPI:string):viod {
    if (this.allCancelApi[calcelAPI]) {
      // 4、source.cancel
      this.allCancelApi[calcelAPI].cancel('Cancel')
    }
  }
}
const cancelControl = new CancelControl()
class RequestHttp {
  service: AxiosInstance
  constructor() {
    this.service = axios.create(config)
    /**
     * @description 请求拦截器
     */
    this.service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      // 取消请求
      if (config?.multipleCancel) {
        // 如果设置了连续请求时取消之前的请求，取消请求
        cancelControl.abort(config.url)
        // 2、发送请求并关联取消标记
        config.cancelToken = cancelControl.setAbortAPI(config.url) /* axios  v0.22.0以下版本  */
      }
      const myLoading = useSeverLoadingStore() // 调用方法,控制加载动画的开启关闭
      console.log("🚀 ~ file: index.ts:28 ~ config:", config)
      const loadingWhiteList:string[] = []; // 请求白名单
      if (!loadingWhiteList.includes(config?.url ?? '')) { // 如果白名单中没有请求的url,则加载loading
        myLoading.addLoading()
      }
      return config
    },(error: any) => {
      const myLoading = useSeverLoadingStore() // 调用方法,控制加载动画的开启关闭
      myLoading.initCount()
      Promise.reject(error);
    })

    /**
     * @description 响应拦截器
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const myLoading = useSeverLoadingStore() // 调用方法,控制加载动画的开启关闭
        // console.log(response, 'response');
        myLoading.isCloseLoading()
        const { data, config, status } = response
        if (SUCCESS_CODE.includes(data.code) || config.responseType == 'blob') {
          return Promise.resolve(data.data) 
        } else {
          message.error(checkStatus(status))
          return Promise.reject(data);
        }
      },
      (error: AxiosError) => {
        const myLoading = useSeverLoadingStore() // 调用方法,控制加载动画的开启关闭
        myLoading.initCount()
        const { response } = error
        if (response) {
          // 请求已发出，但是不在2xx的范围
          message.error(checkStatus(response.status))
          return Promise.reject(response.data);
        } else {
          message.error('网络连接异常,请稍后再试!')
        }
      }
    )
  }

  // 常用请求方法封装
  get(url: string, params?: object, _object = {}) {
    return this.service.get(url, { params, ..._object })
  }
  post(url: string, params?: object, _object = {}) {
    return this.service.post(url, params, _object)
  }
  put(url: string, params?: object, _object = {}) {
    return this.service.put(url, params, _object)
  }
  delete(url: string, params?: any, _object = {}) {
    return this.service.delete(url, { params, ..._object })
  }
}

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
const checkStatus = (status: number): string => {
  switch (status) {
    case 404:
      return '资源不存在！'
    case 405:
      return '请求方式错误！'
    case 500:
      return '服务器异常！'
    // 取消请求
    case undefined:
      return ''
    default:
      return '请求失败！'
  }
}

const request = new RequestHttp()
export default request
