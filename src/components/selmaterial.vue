<template>
     <div class="material-list">
            <ul class="type">
                <li v-for="(item,index) in typeData" :class= "{active:index === cur}"  :key= "index" @click= "selType(index)">{{item}}</li>
            </ul>
            <div class="image-text" :class= "{show:cur === 0}">
               <div class="txt-content">
                     <div class="items">
                        <h1>编辑区</h1>
                        <textarea v-model= "text" row="2"></textarea>
                     </div>
                     <div class="items ant-col">
                        <h1>预览区</h1>
                        <div>{{text}}</div>
                     </div>
               </div>
              <el-tooltip placement="top">
                  <div slot="content">如何发送文字链接</div>
                  <el-button>如何发送文字链接?</el-button>
              </el-tooltip>
            </div>
            <div class="image-text"  :class= "{show:cur === 1}">
                <div class="notice">仅显示微图文消息</div>
                <a href="javascript:" class="white-btn" @click = "syncData()">同步</a>
                <div class="masonry">
                    <div class="item" v-for="(node,index) in materialData" :key = "index">
                       <div class="layer" :class="{show:currentindex === index}"><img src="/static/images/right-ico.png" /></div>
                       <div class="date">
                          <span><img src="/static/images/wx-ico.jpg" />{{$common.getDate(node.updateTime,false)}}更新</span>
                          <el-tooltip placement="bottom">
                            <div slot="content" v-for="(item, i) in node.wechatArticleList" :key = "i" >
                              <a :href="item.url" class="link" target="_blank">{{item.title}}</a>
                            </div>
                            <a href="javascript:">查看链接</a>
                          </el-tooltip>
                       </div>
                       <dl class="ant-col" @click="selSendcon(index,node.wxMediaId)">
                         <dd :class="{first: i === 0}"  v-for="(item, i) in node.wechatArticleList" :key = "i" >
                            <div><a :href="item.url" target="_blank">{{item.title}}</a></div>
                            <img class="lazy" :src="item.thumbMediaUrl" />
                         </dd>
                       </dl>
                    </div>
                </div>
                <a  href="javascript:" class="load-more" @click="moreEvent" v-if="totalNum > search.pageSize">{{moreContent}}</a>
            </div>
        </div>
</template>
<script>
import materialapi from '../api/materialapi'
export default {
  data () {
    return {
      materialapi: materialapi,
      text: '',
      content: '',
      currentindex: '',
      typeData: ['文字', '图文消息', '图片', '语音', '视频'],
      cur: 0,
      moreContent: '加载更多图文素材...',
      flag: false, // 判断是否合并查询数组同步功能
      materialData: [],
      totalNum: 0,
      totalPage: 1,
      search: {
        'type': 'news',
        'currentPage': 1,
        'pageSize': 5
      }
    }
  },
  props: ['current', 'message', 'mediaid'],
  created () {
    this.loadList()
  },
  methods: {
    loadList () {
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
        } else {
          if (this.flag === false) {
            this.materialData = this.materialData.concat(rs.data.items)
          } else {
            this.materialData = rs.data.items
          }
          this.totalNum = rs.data.totalNum
          this.totalPage = rs.data.totalPage
          // console.log(rs.data)
        }
      })
    },
    syncData () {
      this.flag = true
      this.materialapi.getList().then(rs => {
        if (rs.returnCode === 'F') {
          this.$message({
            message: `${rs.returnMsg}`,
            center: true,
            type: 'error'
          })
        } else {
          this.search.currentPage = 1
          this.loadList()
        }
      })
    },
    moreEvent () {
      if (this.search.currentPage >= this.totalPage) {
        this.search.currentPage = this.totalPage
        this.moreContent = '已经是最后一页了'
        this.$message({
          message: `已经是最后一页了！`,
          center: true,
          type: 'warning'
        })
      } else {
        this.search.currentPage = this.search.currentPage + 1
        this.loadList()
      }
    },
    selType (index) {
      this.cur = index
      this.$emit('update:current', index)
    },
    selSendcon (id, mediaid) {
      this.currentindex = id
      this.$emit('update:mediaid', mediaid)
    }
  },
  watch: {
    current (val) {
      this.cur = val
    },
    text (val) {
      this.$emit('update:message', val)
      this.$emit('update:current', 0)
    }
  }
}
</script>
