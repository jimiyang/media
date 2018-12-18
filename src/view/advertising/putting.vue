<template>
  <div class="create-blocks flex-type">
    <ul>
        <!--<li>
          <label>流量投放方式</label>
          <div>
            <el-radio v-model="puttingType" label="0">轮播（随机方式）</el-radio>
            <el-radio v-model="puttingType" label="1">按点击效果</el-radio>
            <el-radio v-model="puttingType" label="2">收益最大化</el-radio>
            <el-radio v-model="puttingType" label="3">平滑投放</el-radio>
          </div>
        </li>-->
        <li>
           <label>请选择一个渠道：</label> 
           <el-select v-model="channelId" placeholder="请选择" @change="getChangeVal">
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.channelName"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li>
           <div class="advertActivity">
             <label>可选择的广告活动(可多选)</label>
             <el-checkbox-group v-model="allCheckedList">
               <el-checkbox v-for="(item, i) in advertList" :key="i" :label="item.id">{{item.advertName}}</el-checkbox>
             </el-checkbox-group>
           </div>
        </li>
        <li class="flex-con">
           <label>排除代理商：</label> 
           <div>
             <textarea placeholder="多个代理商请以，分隔" v-model="excludeAgencyCode"></textarea>
             <p class="msg-txt">提示：多个代理商请以，分隔</p>
           </div>
        </li>
        <li class="flex-con">
           <label>排除商户：</label> 
           <div>
            <textarea placeholder="多个公众号请以，分隔" v-model="excludeMerchantCode"></textarea>
            <p class="msg-txt">提示：多个公众号请以，分隔</p>
           </div>
        </li>
    </ul>
    <div class="btn-blocks">
      <a href="javascript:" class="blue-btn" v-if="disabled === false" @click="putinEvent">投放</a>
      <a href="javascript:" class="blue-btn" v-else><img src="../../../static/images/loading.gif"/></a>
      <a href="javascript:" class="white-btn" @click="resetForm">重置</a>
    </div>
  </div>
</template>
<style lang="less" src="../../../static/less/advert.less"></style>
<script>
import advertapi from '../../api/advert.js'
export default {
  data () {
    return {
      advertapi: advertapi,
      puttingType: '0',
      channelId: '',
      excludeMerchantCode: '',
      excludeAgencyCode: '',
      channelList: [],
      advertList: [],
      allCheckedList: [],
      disabled: false
    }
  },
  created () {
    this.getChannellist()
    this.getAdvertList()
  },
  methods: {
    getChannellist () {
      this.advertapi.channelList().then(rs => {
        console.log(rs)
        if (rs.returnCode === 'F') {
          this.$common.errorMsg(rs, this)
        } else {
          this.channelList = rs.data
          console.log(this.channelList)
        }
      })
    },
    getAdvertList () {
      this.advertapi.allList().then(rs => {
        if (rs.returnCode === 'F') {
          this.$common.errorMsg(rs, this)
        } else {
          this.advertList = rs.data
          console.log(this.advertList)
        }
      })
    },
    getChangeVal () {
      this.advertapi.getAdvertListByChannelId({channelId: this.channelId}).then(rs => {
        if (rs.returnCode === 'F') {
          this.$common.errorMsg(rs, this)
        } else {
          let arr = []
          if (rs.data.length > 0) {
            rs.data.map((data) => {
              arr.push(data.id)
            })
            this.excludeAgencyCode = rs.data[0].excludeAgencyCode
            this.excludeMerchantCode = rs.data[0].excludeMerchantCode
          } else {
            this.excludeAgencyCode = ''
            this.excludeMerchantCode = ''
          }
          this.allCheckedList = arr
        }
      })
    },
    putinEvent () {
      let arr = []
      this.allCheckedList.map((data) => {
        arr.push(data)
      })
      let params = {
        flowType: this.puttingType,
        channelId: this.channelId,
        advertIdList: arr,
        excludeMerchantCode: this.excludeMerchantCode,
        excludeAgencyCode: this.excludeAgencyCode
      }
      console.log(params)
      this.disabled = true
      this.advertapi.channelSetAdvert(params).then(rs => {
        this.disabled = false
        if (rs.returnCode === 'F') {
          this.$common.errorMsg(rs, this)
        } else {
          this.$message({
            type: 'success',
            message: '广告投放成功'
          })
        }
      })
    },
    resetForm () {
      this.puttingType = '0'
      this.channelId = ''
      this.excludeMerchantCode = ''
      this.excludeAgencyCode = ''
      this.allCheckedList = []
    }
  }
}
</script>
