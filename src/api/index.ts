import requests from '@utils/mockReques'
import '@/mock/user'

export const reqGetBannerList = (data:Object) => {
  return new Promise((resolve, reject) => {
    requests.service({
      url: '/banner',
      method: 'post',
      data
    }).then((res:any) => {
      resolve(res.data)
    })
  })
}
export const reqGetFruitList = (data:Object) => {
  return new Promise((resolve, reject) => {
    requests.service({
      url: '/fruits',
      method: 'post',
      data
    }).then((res:any) => {
      resolve(res.data)
    })
  })
}

export const getDicData = (key:String) =>{
  return new Promise((resolve, reject) => {
    requests.service({
      url: `/${key}`,
      method: 'post',
    }).then((res:any) => {
      resolve(res)
    })
  })
}