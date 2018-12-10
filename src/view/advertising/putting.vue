<template>
  <div class="create-blocks flex-type">
    <ul>
        <li>
          <label>流量投放方式</label>
          <div>
            <el-radio v-model="puttingType" label="1">轮播（随机方式）</el-radio>
            <el-radio v-model="puttingType" label="2">按点击效果</el-radio>
            <el-radio v-model="puttingType" label="3">收益最大化</el-radio>
            <el-radio v-model="puttingType" label="4">平滑投放</el-radio>
          </div>
        </li>
        <li>
           <label>请选择一个渠道：</label> 
           <el-select v-model="channelValue" placeholder="请选择" @change="getChangeVal">
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li>
           <div class="advertActivity">
             <label>可选择的广告活动(可多选)</label>
             <div>
                <el-checkbox v-for="(item, i) in advertList" :key="i">{{item.advertName}}</el-checkbox>
             </div>
           </div>
        </li>
        <li>
           <label>排除代理商：</label> 
            <textarea></textarea>
        </li>
        <li>
           <label>排除公众号：</label> 
            <textarea></textarea>
        </li>
    </ul>
    <div class="btn-blocks">
      <a href="javascript:" class="blue-btn" @click="submitForm('form')">保存</a>
      <a href="javascript:" class="white-btn" @click="resetForm('form')">重置</a>
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
      puttingType: '1',
      channelValue: '',
      channelList: [],
      advertList: []
    }
  },
  created () {
    this.getChannellist()
    this.getAdvertList()
  },
  methods: {
    getChannellist () {
      this.advertapi.channelList().then(rs => {
        this.channelList = rs.data
      })
    },
    getAdvertList () {
      this.advertapi.allList().then(rs => {
        this.advertList = rs.data
        console.log(rs.data)
      })
    },
    getChangeVal () {
      this.advertapi.getAdvertListByChannel(this.channelValue).then(rs => {
        console.log(rs.data)
      })
    }
  }
}
</script>
