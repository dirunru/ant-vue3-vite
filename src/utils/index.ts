import dayjs from 'dayjs'
/**
 * @desc 判断是否为数组
 * @param {*} origin
 */
export const isArr = (origin: any): boolean => {
  let str = '[object Array]'
  return Object.prototype.toString.call(origin) == str ? true : false
}

/**
 * @desc 千分位显示
 * number：要格式化的数字
 * decimals：保留几位小数
 * dec_point：小数点符号
 * thousands_sep：千分位符号
 */
export const numFormat = (value: any, decimals = 2, dec = '.', sep = ',') => {
  if (!value) {
    return 0;
  }
  value = (value + '').replace(/[^0-9+-Ee.]/g, '')
  let n = !isFinite(+value) ? 0 : +value
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)

  let s = undefined
  let toFixedFix = function (n: number, prec: number) {
    let k = Math.pow(10, prec)
    return '' + Math.round(n * k) / k
  }

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  let re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }
  return s.join(dec)
}

// 通过dayjs插件动态获取年份列表
export const getYearList = (time?: string) => {
  let currentYear = dayjs().format('YYYY') || 2024
  let lastYear = dayjs().subtract(1, 'years').format('YYYY')
  let nextYear = dayjs().subtract(-1, 'years').format('YYYY')
  let yearList:Array<any> = [
    {
      label: lastYear + '年',
      value: lastYear
    },
    {
      label: currentYear + '年',
      value: dayjs().format('YYYY')
    },
    {
      label: nextYear + '年',
      value: nextYear
    }
  ]
  return yearList
}

