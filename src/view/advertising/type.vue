<template>
  <div class="advert-type">
      <router-link  :to="{path: 'create', query: {type:0}}">H5广告</router-link>
      <router-link  :to="{path: 'createBanner', query: {type:1}}">banner广告</router-link>
      <router-link  :to="{path: 'createMessagetemp', query: {type:2}}">模版消息广告</router-link>
  </div>
</template>
