<template>
  <div class="create-blocks">
  <div class="page-nav">广告位管理&nbsp;>&nbsp;创建广告&nbsp;>&nbsp;<router-link to='/advertising/advertspacelist'>返回列表</router-link></div>
  <el-form ref="form" :model="form" :rules="rules">
    <ul>
      <li>
        <el-form-item label="广告位类型：" prop="adType">
          <el-select v-model="form.adType" placeholder="请选择">
            <el-option value="支付宝" label="支付宝">支付宝</el-option>
            <el-option value="微信" label="微信">支付宝</el-option>
          </el-select>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="广告位code：" prop="channelCode">
          <input type="text" class="ipttxt" v-model="form.channelCode " placeholder="请输入广告主名称"/>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="广告位名称：" prop="channelName">
           <input type="text" class="ipttxt" v-model="form.channelName" placeholder="请输入广告标题"/>
        </el-form-item>
      </li>
    </ul>
  </el-form>
  <div class="btn-blocks">
    <a href="javascript:" class="blue-btn" v-if="disabled === false"  @click="submitForm('form')">保存</a>
    <a href="javascript:" class="blue-btn" v-else><img src="../../../static/images/loading.gif"/></a>
    <a href="javascript:" class="white-btn" @click="resetForm('form')">重置</a>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        adType: '',
        channelCode: '',
        channelName: ''
      },
      disabled: false
    }
  },
  methods: {
    submitForm (formName) {
      console.log(formName)
    },
    resetForm (formName) {
      console.log(formName)
    }
  }
}
</script>

