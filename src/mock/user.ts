
const Mock = require('mockjs')
//1. “/api/vip/get2”  是需要拦截的请求路径 2. ‘post’ 方法， 3. {}是返回的自定义数据
//  [mock文档](http://mockjs.com/examples.html#Array)
// {
//   data: {
//     code: "200",
//     "list|800": [
//       {
//         id: "@guid",
//         name: "@cname",
//         age: "@integer(18, 100)",
//         time: "@date",
//         email: "@email",
//         address: "@county(true)",
//         gender: "@boolean",
//       },
//     ],
//   },
// }
Mock.mock('/mock/banner', 'post', (option: any) => {
  let info = JSON.parse(option.body)
  let dataList  =  Mock.mock({
    'list|10': [{
      'rate|0-100': 1,
    }]
  })
  return {
    code: 200,
    message: 'success',
    data: dataList.list
  }
})
Mock.mock('/mock/fruits', 'post', (option: any) => {
  let dataList  =  Mock.mock({
    'fruit|3': [{ 'name': () => Mock.Random.pick(['苹果', '香蕉', '橙子', '葡萄', '樱桃', '樱桃']), code: '@guid' }]
  })
  return {
    code: 200,
    message: 'success',
    data: dataList.fruit
  }
})
