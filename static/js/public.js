let obj = {
  getDate (time, flag) {
    let date = new Date(time)
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let minute = date.getMinutes()
    let second = date.getSeconds()
    minute = minute < 10 ? ('0' + minute) : minute
    second = second < 10 ? ('0' + second) : second
    let str = flag ? `${y}-${m}-${d}  ${h}:${minute}:${second}` : `${m}月${d}日  ${h}:${minute} `
    return str
  },
  msgTypelist (name, type) {
    let Data = [
      {id: 'text', name: '文本消息'},
      {id: 'mpnews', name: '图文消息'},
      {id: 'image', name: '图片'},
      {id: 'voice', name: '语音'},
      {id: 'video', name: '视频'},
      {id: 'wxcard', name: '卡券'}
    ]
    let tname = ''
    for (let i = 0; i < Data.length; i++) {
      if (type === 0) {
        if (Data[i].id === name) {
          tname = Data[i].name
        }
      } else if (type === 1) {
        if (i === name) {
          tname = Data[i].id
        }
      }
    }
    return tname
  }
}
// prototype封装
export default{
  install (Vue) {
    Vue.prototype.$common = obj
  }
}
