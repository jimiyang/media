<template>
    <div class="tips-content" >
        <div class="layers" :class="{show:isopen}"></div>
        <div class="account-list" :class="{open:isopen}">
            <div class="title">
                <a href="javascript:" class="back" @click="back">{{msgBack}}</a>
                <div>
                    <span @click="change(0,'公众号')"  :class="{checked: ischecked === 0}">公众号</span>
                    <span  @click="change(1,'小程序')" :class="{checked: ischecked === 1}">小程序</span>
                </div>
                <a href="javascript:" class="add" @click="goAuthor">+{{name}}</a>
            </div>
            <ul class="list">
                <li  v-for ="(item,index) in Data" :key="index" @click="tagEvent(item)">
                    <img :src="item.headImg" />
                    <div>
                        <h1>{{item.nickName}}</h1>
                        <p>{{item.isAuth === 0 ? "未授权" : "已授权"}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import publicapi from '../../api/pubnumapi'
    import bus from '../../until/eventbus'
    export default{
      data () {
        return {
          name: '公众号',
          ischecked: 0,
          isopen: true,
          isShow: false,
          Data: [],
          imgurl: '',
          publicapi: publicapi,
          msgBack: ''
        }
      },
      props: ['open'],
      created () {
        this.publicapi.switchList().then(rs => {
          if (rs.returnCode === 'F') {
            this.$common.errorMsg(rs, this)
          } else {
            this.Data = rs.data
          }
        })
        bus.$on('ischange', obj => {
          if (obj !== null) {
            this.msgBack = '返回'
          }
        })
        if (sessionStorage.getItem('appInfo') !== null) {
          this.msgBack = '返回'
        }
      },
      methods: {
        goAuthor () {
          let sucessAuthRedirectUri = encodeURIComponent('/account/publist')
          location.href = `/wechat/*/authPage?sucessAuthRedirectUri=${sucessAuthRedirectUri}`
        },
        change (index, item) {
          this.ischecked = index
          this.name = item
        },
        back () {
          this.$emit('update:open', false)
          this.isopen = false
        },
        tagEvent (item) {
          if (item.isAuth === 0) {
            this.$message({
              type: 'warning',
              message: `请您先对公众号进行授权！`
            })
            return false
          }
          this.publicapi.switchApp({'appId': item.appId}).then((rs) => {
            if (rs.returnCode === 'F') {
              this.$common.errorMsg(rs, this)
            } else {
              this.isopen = false
              this.$emit('update:open', false)
              window.sessionStorage.setItem('appInfo', JSON.stringify(rs.data))
              bus.$emit('ischange', JSON.parse(window.sessionStorage.getItem('appInfo'))) // 中间件
              this.$router.push({'path': '/account/publist'})
            }
          })
        }
      },
      watch: {
        open (val) {
          this.isopen = val
          this.$emit('update:open', val)
        }
      }
    }
</script>
