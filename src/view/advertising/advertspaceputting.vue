<template>
  <div class="create-blocks flex-type">
    <ul>
        <li>
          <label>广告位类型：</label>H5
        </li>
        <li>
          <label>广告位code：</label>wx
        </li>
        <li>
          <label>广告位名称：</label>微信支付完成后广告
        </li>
        <li>
           <div class="advertActivity">
             <label>可选择的广告位</label>
             <el-checkbox-group v-model="allCheckedList">
               <el-checkbox v-for="(item, i) in advertList" :key="i" :label="item.id">{{item.channelName}}</el-checkbox>
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
<script>
export default {
  data () {
    return {
      allCheckedList: [],
      advertList: [],
      excludeAgencyCode: '',
      excludeMerchantCode: '',
      disabled: false
    }
  },
  methods: {
    putinEvent () {
      console.log('投放')
    },
    resetForm () {
      console.log('重置')
    }
  }
}
</script>

