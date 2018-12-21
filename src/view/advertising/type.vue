<template>
    <div class="create-blocks">
      <div class="page-nav">广告管理&nbsp;>&nbsp;创建广告</div>
      <div class="advert-type mt20">
          <router-link  :to="{path: 'create', query: {type:0}}">H5广告</router-link>
          <router-link  :to="{path: 'createBanner', query: {type:1}}">banner广告</router-link>
          <router-link  :to="{path: 'createMessagetemp', query: {type:2}}">模版消息广告</router-link>
      </div>
    </div>
</template>
<style lang="less" src="../../../static/less/advert.less"></style>
