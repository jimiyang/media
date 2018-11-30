<template>
    <div class="material-items">
        <el-button type="primary" @click = "syncData">同步图文素材</el-button>
        <div class="news-list" v-loading="loading">
            <div class="items"  v-for= "(item,index) in materialData" :key= "index">
                <dl>
                    <dd :class= "{first : i === 0}" v-for= "(data,i) in item.wechatArticleList" :key = "i"  @mouseenter="enter(data.id)">
                        <span><a :href= "data.url" target="_blank">{{data.title}}</a></span>
                        <img :src= "data.thumbMediaUrl " />
                        <div class="layer" :class= "{show: current=== data.id}"><a :href= "data.url" target="_blank">预览文章</a></div>
                    </dd>
                </dl>
                <div class="time">{{$common.getDate(item.updateTime,false)}}</div>
            </div>
        </div>
        <div class="g-tc blue-color more" @click= "moreEvent" v-if= "totalNum > search.pageSize">{{message}}</div>
    </div>
</template>
<script>
import materialapi from '../../api/materialapi'
export default {
  data () {
    return {
      materialapi: materialapi,
      message: '加载更多图文素材...',
      materialData: [],
      totalNum: 0,
      totalPage: 1,
      search: {
        'type': 'news',
        'currentPage': 1,
        'pageSize': 5
      },
      loading: false,
      current: ''
    }
  },
  created () {
    this.getMeadiaList()
  },
  methods: {
    enter (index) {
      this.current = index
    },
    moreEvent () {
      if (this.search.currentPage >= this.totalPage) {
        this.search.currentPage = this.totalPage
        this.$message({
          message: `已经是最后一页了！`,
          center: true,
          type: 'warning'
        })
      } else {
        this.search.currentPage = this.search.currentPage + 1
        if (this.search.currentPage === this.totalPage) {
          this.message = '已经是最后一页了'
        }
        this.getMeadiaList()
      }
    },
    getMeadiaList () {
      this.materialapi.getMediaListByType(this.search).then(rs => {
        if (rs.returnCode === 'F') {
          this.$message({
            message: `${rs.returnMsg}`,
            center: true,
            type: 'error'
          })
          if (rs.errorCode === '000005') {
            this.$router.push({path: '/'})
          }
          this.loading = false
        } else {
          this.loading = false
          if (this.search.currentPage !== 1) {
            this.materialData = rs.data.items.concat(this.materialData)
          } else {
            this.materialData = rs.data.items
          }
          this.totalNum = rs.data.totalNum
          this.totalPage = rs.data.totalPage
          console.log(rs.data.items.concat(this.materialData))
        }
      })
    },
    syncData () {
      // this.loading = true
      this.search.currentPage = 1
      this.materialapi.getList().then(rs => {
        if (rs.returnCode === 'F') {
          this.$message({
            message: `${rs.returnMsg}`,
            center: true,
            type: 'error'
          })
          if (rs.errorCode === '000005') {
            this.$router.push({path: '/'})
          }
        } else {
          this.getMeadiaList()
        }
      })
    }
  }
}
</script>
