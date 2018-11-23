<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// provide / inject 组合  刷新当前页
export default {
  name: 'App',
  /* provide () { v-if = "isRouterAlive"
     return {
       reload : this.reload
     }
  },
  data () {
    return {
      isRouterAlive : true
    }
  },
  methods : {
    reload() {
      this.isRouterAlive = false 
      this.$nextTick(function() {
         this.isRouterAlive = true
      })
    }
  } */
}
</script>
