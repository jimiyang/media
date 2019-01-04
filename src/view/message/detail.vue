<template>
  <div class="msg-list">
    <div class="page-nav">消息管理&nbsp;>&nbsp;推送详情&nbsp;>&nbsp;<router-link to='/message/list'>返回列表</router-link></div>
    <div class="msg-content" v-for="(item,i) in detail" :key="i">
        <div class="public-name">公众号名称：{{item.appNickName}}</div>
        <el-steps :active="item.sendStatus+1" finish-status="success">
            <el-step title="创建任务"></el-step>
            <el-step title="微信发送中"></el-step>
            <el-step title="群发完毕"></el-step>
        </el-steps> 
        <ul class="list">
            <li class="wrap">
                <div>群发对象：{{item.target}}</div>
                <div>组别：{{item.target}}</div>
            </li>
            <li>成功人数：{{item.sentCount}}人</li>
            <li>失败人数：{{item.errorCount}}人</li>
            <li>发送时间：{{$common.getDate(item.sendDate,true)}}</li>
            <li :class="{hide:msgtype !== item.msgtype}">
                <label>当前图文消息：</label>
                <el-select  v-model="selectVal"  placeholder="请选择">
                      <el-option
                        v-for="(data, i) in item.wechatMediaResponse.wechatArticleList"
                        :key="i"
                        :label="data.title"
                        :value="i">
                      </el-option>
                </el-select>
                <a href="javascript:" class="blue-btn" @click = "delMsg(item)">删除图文</a>
            </li>
        </ul>
    </div>
   </div>
</template>
<style lang="less" src="../../../static/less/message.less"></style>
<script>
import messageapi from '../../api/msgapi'
export default {
  data () {
    return {
      messageapi: messageapi,
      detail: [],
      msgtype: 'mpnews',
      selectVal: ''
    }
  },
  created () {
    this.loadList()
  },
  methods: {
    loadList () {
      if (!this.$route.query.id) {
        return false
      }
      this.messageapi.getMsgRecordDetailById({id: this.$route.query.id}).then(rs => {
        if (rs.returnCode === 'F') {
          this.$common.errorMsg(rs, this)
        } else {
          this.detail = rs.data
          console.log(rs)
          // this.detail.wechatMediaResponse = rs.data.wechatMediaResponse.wechatArticleList
        }
      })
    },
    delMsg (item) {
      console.log(item)
      if (this.selectVal !== '' && (item.sendStatus + 1) > 2) {
        let params = {
          msg_id: item.msgId,
          article_idx: parseInt(this.selectVal) + 1,
          appId: item.appid
        }
        this.messageapi.deleteNewsRecord(params).then(rs => {
          if (rs.returnCode === 'F') {
            this.$common.errorMsg(rs, this)
          } else {
            this.$message({
              type: 'success',
              message: `${rs.returnMsg}`
            })
            this.dialogVisible = false
            this.loadList()
          }
        })
      } else {
        this.$message({
          type: 'warning',
          message: `该条图文还未发送成功，请重新发送！`
        })
      }
    }
  }
}
</script>

