<template>
    <div>
        <el-table class="tab-list" ref="multipleTable" :data="pnumberList" :id="index">
            <el-table-column   prop="nickName"  label="公众号名称" ></el-table-column>
            <el-table-column   prop="serviceTypeInfo"  label="帐号类型"   >
                <template slot-scope="scope">
                    <span>{{scope.row.serviceTypeInfo === 0 ? "订阅号" : "服务号"}}</span>
                </template>
            </el-table-column>
            <el-table-column   prop="authorizationDate"  label="授权时间">
                <template slot-scope="scope">
                    <span  v-if="scope.row.authorizationDate !== null"> 
                         {{scope.row.authorizationDate !== null ? scope.row.authorizationDate: '--' }}
                         <a href="javascript:" class="blue-color"  @click="authorizationEvent(scope.row)">
                             {{text}}
                         </a>
                    </span>
                    <span v-else>
                         --<a href="javascript:" class="blue-color" @click="goAuthor">重新授权</a>
                    </span>
                </template>
            </el-table-column>
            <el-table-column   prop="fansCount"  label="粉丝数"></el-table-column>
            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <el-button @click="switchApp(scope.row.appId)" type="text" size="small">切换</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import pubnumapi from '../../api/pubnumapi.js'
import bus from '../../until/eventbus.js'
export default{
  data () {
    return {
      publicapi: pubnumapi,
      pnumberList: [],
      time: '',
      index: 0,
      text: '解除授权'
    }
  },
  created () {
    this.loadList()
  },
  methods: {
    loadList () {
      this.publicapi.getList().then((rs) => {
        if (rs.returnCode === 'F') {
          this.$common.errorMsg(rs, this)
        } else {
          this.pnumberList = rs.data
        }
      })
    },
    goAuthor () {
      let sucessAuthRedirectUri = encodeURIComponent('/account/publist')
      location.href = `/wechat/*/authPage?sucessAuthRedirectUri=${sucessAuthRedirectUri}`
    },
    // 解除授权
    authorizationEvent (item) {
      this.publicapi.quitAuth({'appId': item.appid}).then((rs) => {
        if (rs.returnCode === 'F') {
          this.$common.errorMsg(rs, this)
        } else {
          this.$message({
            message: `${rs.returnMsg}`,
            center: true,
            type: 'success'
          })
          this.loadList()
        }
      })
    },
    switchApp (id) { // 切换
      this.publicapi.switchApp({'appId': id}).then((rs) => {
        if (rs.returnCode === 'F') {
          this.$common.errorMsg(rs, this)
        } else {
          this.$message({
            message: `${rs.returnMsg}`,
            center: true,
            type: 'success'
          })
          window.sessionStorage.setItem('appInfo', JSON.stringify(rs.data))
          bus.$emit('ischange', JSON.parse(window.sessionStorage.getItem('appInfo')))
        }
      })
    }
  }
}
</script>
