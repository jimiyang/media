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
  },
  menuList () {
    let node = [
      {'name': '消息管理', 'ico': 'el-icon-message', 'children': [{'id': '001', 'name': '群发消息', 'url': '/message/allsend'}, {'id': '002', 'name': '消息记录', 'url': '/message/list'}]},
      {'name': '用户管理', 'ico': 'el-icon-menu', 'children': [{'id': '101', 'name': '粉丝列表', 'url': '/user/fanlist'}, {'id': '102', 'name': '标签管理', 'url': '/user/lablist'}]},
      {'name': '素材管理', 'ico': 'el-icon-picture', 'children': [{'id': '201', 'name': '图文素材', 'url': '/material/list'}]},
      {'name': '帐号设置', 'ico': 'el-icon-setting', 'children': [{'id': '301', 'name': '公众号列表', 'url': '/account/publist'}]},
      {
        'name': '广告管理',
        'ico': 'el-icon-goods',
        'children': [
          {'id': '401', 'name': '广告管理', 'url': '/advertising/list'},
          {'id': '402', 'name': '广告位管理', 'url': '/advertising/advertspacelist'},
          {'id': '403', 'name': '广告投放', 'url': '/advertising/putting'}
        ]
      }
    ]
    return node
  },
  regeXp (value) {
    let regList = {
      phone: /^[1][3,4,5,7,8][0-9]{9}$/,
      password: /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/
    }
    let check = {}
    for (let i in regList) {
      check[i] = regList[i].test(value)
    }
    return check
  },
  errorMsg (rs, th) {
    th.$message({
      type: 'error',
      message: `${rs.returnMsg}`
    })
    if (rs.errorCode === '000005') {
      th.$router.push({path: '/'})
    }
  }
}
// prototype封装
export default obj
