<template>
  <div class="create-blocks flex-type">
    <div class="page-nav">广告位管理&nbsp;>&nbsp;创建广告&nbsp;>&nbsp;<router-link to='/advertising/advertspacelist'>返回列表</router-link></div>
    <ul>
        <li>
          <label>广告位类型：</label>{{adTypeName}}
        </li>
        <li>
          <label>广告位code：</label>{{form.channelCode}}
        </li>
        <li>
          <label>广告位名称：</label>{{form.channelName}}
        </li>
        <li>
           <div class="advertActivity">
             <label>可选择的广告位</label>
             <el-checkbox-group v-model="advertIdList">
               <el-checkbox v-for="(item, i) in advertList" :key="i" :label="item.id">{{item.advertName}}</el-checkbox>
             </el-checkbox-group>
           </div>
        </li>
        <li class="flex-con">
           <label>排除代理商：</label> 
           <div>
             <textarea placeholder="多个代理商请以，分隔" v-model="form.excludeAgencyCode"></textarea>
             <p class="msg-txt">提示：多个代理商请以，分隔</p>
           </div>
        </li>
        <li class="flex-con">
           <label>排除商户：</label> 
           <div>
            <textarea placeholder="多个公众号请以，分隔" v-model="form.excludeMerchantCode"></textarea>
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
      advertList: [],
      disabled: false,
      advertIdList: [],
      form: {
        flowType: '',
        channelCode: '',
        channelName: '',
        excludeAgencyCode: '',
        excludeMerchantCode: ''
      }
    }
  },
  created () {
    this.initForm()
  },
  computed: {
    adTypeName: function () {
      let name = ''
      switch (this.form.flowType) {
        case 0:
          name = 'H5广告'
          break
        case 1:
          name = 'banner广告'
          break
        case 2:
          name = '模版消息广告'
          break
      }
      return name
    }
  },
  methods: {
    initForm () {
      if (!this.$route.query.id) {
        return false
      }
      this.advertapi.advertspaceputInDetail({id: this.$route.query.id}).then(rs => {
        if (rs.returnCode === 'F') {
          this.$common.errorMsg(rs, this)
        } else {
          this.form = {
            flowType: rs.data.adType,
            channelCode: rs.data.channelCode,
            channelName: rs.data.channelName,
            excludeAgencyCode: rs.data.advertList[0].excludeAgencyCode,
            excludeMerchantCode: rs.data.advertList[0].excludeMerchantCode
          }
          this.advertList = rs.data.advertList
          let arr = []
          for (var key in this.advertList) {
            if (this.advertList[key].isSelect === 1) {
              arr.push(this.advertList[key].id)
            }
          }
          this.advertIdList = arr
        }
      })
    },
    putinEvent () {
      Object.assign(this.form, {channelId: this.$route.query.id}, {advertIdList: this.advertIdList})
      this.advertapi.channelSetAdvert(this.form).then(rs => {
        if (rs.returnCode === 'F') {
          this.$common.errorMsg(rs, this)
        } else {
          this.$message({
            type: 'success',
            message: '投放成功'
          })
          this.$router.push({path: '/advertising/advertspacelist'})
        }
      })
    },
    resetForm () {
      this.form.excludeAgencyCode = ''
      this.form.excludeMerchantCode = ''
    }
  }
}
</script>

