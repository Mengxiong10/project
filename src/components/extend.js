  export default {
    /**
     * 分割数组为2维
     * @param  {Array}  arr   分割数组
     * @param  {number} size  分割长度
     * @return {Array}        二维数组
     */
    sliceArr (arr, size) {
      let length = arr.length
      let len = parseInt(length / size, 10)
      let remain = length % size
      let newL = remain > 0 ? len + 1 : len
      let _arr = []
      for (let i = 0; i < newL; i++) {
        let start = i * size
        let end = (i === len) ? start + remain : start + size
        let temp = arr.slice(start, end)
        _arr.push(temp)
      }
      return _arr
    },
    /**
     * 格式化日期
     * @param  {Date} date 需要格式化的Date对象
     * @param  {string} fmt  YYYY-MM-DD mm:hh:ss
     * @return {string}      2016-05-05 14:14:14
     */
    format (date, fmt) {
      let o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
      }
      if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    }
  }
