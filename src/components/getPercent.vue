<template>
  <div class="percent-box" :class="{show:isshow === true}">
    <div class="layer"></div>
    <div class="circle-blocks">
      <el-progress type="circle" :percentage="percentage"></el-progress>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      percentage: 0,
      isshow: false
    }
  },
  props: ['show', 'percentageNum'],
  watch: {
    show (val) {
      this.isshow = val
      this.$emit('update:show', val)
    },
    percentageNum (val) {
      this.percentage = val
      this.$emit('update:percentageNum', val)
    }
  }
}
</script>
