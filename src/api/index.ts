import requests from '@/utils/mockReques'
import '@/mock/user'

export const reqGetBannerList = (data:Object) => {
  return new Promise((resolve, reject) => {
    requests.service({
      url: '/banner',
      method: 'post',
      data
    }).then((res:any) => {
      resolve(res)
    })
  })
}
export const reqGetClassList = (data:Object) => {
  return new Promise((resolve, reject) => {
    requests.service({
      url: '/class/page',
      method: 'post',
      data
    }).then((res:any) => {
      resolve(res)
    })
  })
}