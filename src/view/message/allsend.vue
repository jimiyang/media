<template>
    <div class="all-send">
      <div class="page-nav">消息管理&nbsp;>&nbsp;群发消息&nbsp;>&nbsp;<router-link to='/message/list'>返回列表</router-link></div>
        <div class="blocks">
            <div class="send-content">
                <div class="notice">
                    <h1>每日高级可群发的次数至少100次，定向发送获取更佳的用户体验，但对所有粉丝群发仍是每月4次（且与公众平台同步）。</h1>
                    <p>请注意这种情况，如果某个粉丝身上有3个标签，群发3个标签他就会收到3次推送。</p>
                </div>
                <h1 class="title">设置群发内容</h1>
                <a href="javascript:" class="white-btn select" @click= "selectContent">选择群发内容</a>
                <h1 class="title">选择群发对象
                    <span>需要发给同时拥有A和B标签的粉丝？</span>
                </h1>
                <div class="mt20">
                  <div class="current-nickName">当前公众号：{{nickName}}</div>
                  <el-radio-group  v-model="groupMessage.tagId">
                    <el-radio v-for="(item,i) in labList" :key="i" :label="item.wxTagId">{{item.name}}</el-radio>
                  </el-radio-group>
                </div>
                <h1 class="title mt20">附加推送公众号</h1>
                <div class="mt20 extra-box">
                    <div class="mt20" v-for="(item, i) in pnumberList" :key="i" :label="item"><!--:disabled="item.nickName === '生活小精灵'"-->
                      <el-checkbox  v-model="publicNumberChecked[i]" @change="checkPublic(i, item.appId)">{{item.nickName}}</el-checkbox>
                      <el-radio-group @change="radioEvent" v-model="radioCheckedList[i]">
                        <el-radio v-for="(data,i) in item.tagList"  :key="i" :label="data.wxTagId">{{data.name}}</el-radio>
                      </el-radio-group>
                    </div>
                </div>
                <h1 class="title mt20">定时发送及原创校验</h1>
                <div class="ant-items">
                    <div>
                        <label>定时开关 </label>
                        <el-switch  v-model="timingChecked"  active-color="#4993ff"  inactive-color="#E0E0E0"></el-switch>
                        配合关注时间设置，可实现自动化的定期发送效果。
                        <el-tooltip  effect="dark"  placement="top">
                            <div slot="content">举例：选择关注时间为下周二的粉丝，定时<br/>发送时间设置为下周三，即可实现下周二关<br/>注的粉丝自动在下周三收到群发消息推送。</div>
                            <el-button>如何操作？</el-button>
                        </el-tooltip>
                    </div>
                    <div class="block" :class= "{show:timingChecked === true}">
                        <label>请选择具体时间</label><el-date-picker  v-model="groupMessage.sendDate"  type="datetime"  placeholder="选择日期时间"></el-date-picker>
                    </div>
                    <div>
                        <label>转载形式</label>
                        <el-switch  v-model="groupMessage.sendIgnoreReprint"  active-color="#4993ff"  inactive-color="#E0E0E0"></el-switch>
                        当群发内容被微信判定为转载时，将自动替换为原文章内容发送且注明转载来源。
                    </div>
                </div>
            </div>
            <div class="preview-blocks">
                <h1 class="title">微信预览器</h1>
                <div class="news-list">
                    <div class="txt-temp blocks" :class= "{show:cur === 0}">{{groupMessage.content}}</div>
                    <div class="items blocks" :class= "{show:cur === 1}">
                        <dl>
                            <dd v-for= "(item,i) in wechatArticleList" :key= "i"  :class= "{first:i === 0}" >
                               <a :href="item.url" target="_blank">
                                  <span>{{item.title}}</span>
                                  <img :src="item.thumbMediaUrl" />
                                </a>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
       <div class="ant-btn">
            <a href="javascript:" class="white-btn" @click="phonePreview">发送到手机预览</a>
            <a href="javascript:" class="blue-btn" @click="sendSubmit">立即高级群发</a>
            <span>预计发送人数：{{sendNum}}</span>
        </div>
        <el-dialog  title="选择群发内容"  :visible.sync="dialogVisible"  @close='closeDialog' width="35%">
            <selmaterial  :mediaid.sync="groupMessage.mediaId" :current.sync="current" :message.sync="groupMessage.content"></selmaterial>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary"  @click="sendContent">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="选择发送对象" :visible.sync= "dialog"  @close= "closeDialog"  width="600">
             <userlist :checkedUserData.sync="checkedUserData"></userlist>
             <span slot="footer" class="dialog-footer">
                <el-button @click="dialog = false">取 消</el-button>
                <el-button type="primary"  @click="sendUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style lang="less" src="../../../static/less/message.less"></style>
<script>
    import selmaterial from '../../components/selmaterial.vue'
    import userlist from '../../components/userlist.vue'
    import userapi from '../../api/userapi'
    import msgapi from '../../api/msgapi'
    import materialapi from '../../api/materialapi'
    import pubnumapi from '../../api/pubnumapi.js'
    import bus from '../../until/eventbus.js'
    // import com from '../../until/common.js'
    export default {
      data () {
        return {
          msgapi: msgapi,
          timingChecked: false,
          reprintChecked: true,
          dialogVisible: false,
          dialog: false,
          ishide: true,
          isLimit: false, // 判断图文素材是否超过20000字限制
          wechatArticleList: [],
          current: 0, // 当前要发送的消息类型[图文，消息，语音，视频]
          cur: -1,
          labList: [],
          pnumberList: [],
          nickName: JSON.parse(window.sessionStorage.getItem('appInfo')).nickName,
          publicNumberChecked: [],
          radioCheckedList: [],
          publicNumberList: [],
          groupMessage: {
            mediaId: '',
            isToAll: true,
            tagId: 126,
            content: '',
            sendDate: ''
          },
          tagSearch: {
            currentPage: 1,
            pageSize: 5
          },
          checkedUserData: [],
          sendNum: 0 // 发送人数
        }
      },
      components: {selmaterial, userlist},
      created () {
        this.loadTagList()
        this.loadextraList()
        /* let len = 2
        for (let key in len) {
          this.$set(this.radioCheckedList, key, [])
          this.$set(this.publicNumberChecked, key, [])
        } */
      },
      methods: {
        loadTagList () {
          userapi.getList().then(rs => {
            if (rs.returnCode === 'F') {
              this.$common.errorMsg(rs, this)
            } else {
              if (rs.data.items.length > 0) {
                this.labList = rs.data.items
                this.groupMessage.tagId = this.labList[0].wxTagId
              }
            }
          })
        },
        loadextraList () {
          pubnumapi.extraList().then(rs => {
            if (rs.returnCode === 'F') {
              this.$common.errorMsg(rs, this)
            } else {
              this.pnumberList = rs.data
              this.publicNumberList.length = rs.data.length
            }
          })
        },
        selectContent () {
          this.dialogVisible = true
        },
        checkPublic (i, item) {
          if (this.isLimit === true) {
            this.publicNumberChecked[i] = false
            this.$message({
              type: 'warning',
              message: `图文内容大于20000字，附加公众号就不可以勾选！`
            })
            return false
          }
          if (this.publicNumberChecked[i] === true) {
            this.publicNumberList[i] = item
          } else {
            this.publicNumberList.splice(i, 1)
            this.radioCheckedList.splice(i, 1)
          }
        },
        radioEvent (item) {
          // console.log(item)
        },
        closeDialog () {
          this.dialogVisible = false
          this.dialog = false
        },
        sendContent () {
          this.dialogVisible = false
          this.isLimit = false
          this.cur = this.current
          if (this.current !== 0) {
            this.groupMessage.content = ''
          }
          if (this.groupMessage.mediaId !== '') {
            materialapi.getMediaByWxMediaId({wxMediaId: this.groupMessage.mediaId}).then(rs => {
              if (rs.returnCode === 'F') {
                this.$common.errorMsg(rs, this)
              } else {
                this.wechatArticleList = rs.data.wechatArticleList
                this.wechatArticleList.forEach(item => {
                  if (item.content.length > 20000) {
                    this.isLimit = true
                    return false
                  }
                })
              }
            })
          }
        },
        sendUser () { // 手机预览并发送
          let arrOpenid = []
          for (let i = 0; i < this.checkedUserData.length; i++) {
            arrOpenid.push(this.checkedUserData[i].openId)
          }
          if (arrOpenid.length === 0) {
            this.$message({
              type: 'error',
              message: `请选择`
            })
          } else {
            this.dialog = false
            let params = {
              touserList: arrOpenid,
              sendIgnoreReprint: this.reprintChecked === false ? 0 : 1,
              content: this.groupMessage.content,
              media_id: this.groupMessage.mediaId,
              msgtype: this.$common.msgTypelist(this.current, 1)
            }
            this.msgapi.preview(params).then(rs => {
              if (rs.returnCode === 'F') {
                this.$common.errorMsg(rs, this)
              } else {
                this.$message({
                  type: 'success',
                  message: `手机发送成功！`
                })
              }
            })
          }
        },
        phonePreview () { // 手机预览选择发送对象
          bus.$emit('ischeckall', false)
          this.dialog = true
          let params = {
            wxTagId: this.groupMessage.tagId,
            currentPage: 1,
            pageSize: 10
          }
          userapi.getTagfanslistByid(params).then(rs => {
            if (rs.returnCode === 'F') {
              this.$common.errorMsg(rs, this)
            } else {
              this.sendNum = rs.data.totalNum
              bus.$emit('node', rs)
              bus.$emit('tagID', this.groupMessage.tagId)
            }
          })
        },
        sendSubmit () { // 高级群发
          this.$confirm('是否立即发送?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.timingChecked === false) {
              this.groupMessage.sendDate = null
            }
            let extraPubTagList = []
            for (let key in this.publicNumberList) {
              if (this.radioCheckedList[key] !== undefined) {
                extraPubTagList.push({'pubAppId': this.publicNumberList[key], 'pubTagWxId': this.radioCheckedList[key]})
              }
            }
            Object.assign(
              this.groupMessage, {msgtype: this.$common.msgTypelist(this.current, 1), sendIgnoreReprint: this.reprintChecked === false ? 0 : 1, extraPubTagList: extraPubTagList}
            )
            this.msgapi.batchMessage(this.groupMessage).then(rs => {
              if (rs.returnCode === 'F') {
                this.$common.errorMsg(rs, this)
              } else {
                this.$message({
                  type: 'success',
                  message: `群发成功！`
                })
              }
            })
          })
        }
      },
      watch: {
        content (val) {
          this.content = val
        }
      }
    }
</script>
