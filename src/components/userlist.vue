<template>
    <div class="userlist-box">
        <div class="search-box">
              搜索用户：<el-input  v-model="name"    placeholder="请输入用户昵称" style="width:200px"></el-input>
              <el-button type="primary" @click = "searchUser">搜索</el-button>
        </div>
          <template>
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox><br/>
              <div class="list">
                  <el-checkbox-group v-model="checkedPersonal" @change="handleCheckedCitiesChange">
                      <el-checkbox class="checkbox" v-for="(item,index) in restaurants"  :label="item" :key="index">
                          <div class="personal-col"><img :src = "item.headImgUrl" />{{item.nickName}}</div>
                      </el-checkbox>
                  </el-checkbox-group>
              </div>
          </template>
        <div class="more" @click="moreEvent" v-if="totalNum > search.pageSize">{{message}}</div>
    </div>
</template>
<script>
import bus from '../until/eventbus.js'
import userapi from '../api/userapi'
export default {
  data () {
    return {
      name: '',
      message: '加载更多......',
      search: {
        currentPage: 1,
        pageSize: 10
      },
      totalNum: 0,
      tagid: '',
      checkAll: false,
      checkedPersonal: [],
      isIndeterminate: true,
      allUserList: [],
      restaurants: [] // 该标签下所有用户
    }
  },
  props: ['checkedUserData'],
  created () {
    bus.$on('node', obj => {
      this.allUserList = obj.data.items
      this.restaurants = obj.data.items
      this.totalNum = obj.data.totalNum
    })
    bus.$on('ischeckall', obj => {
      this.checkAll = obj
    })
    bus.$on('tagID', val => {
      this.tagid = val
    })
  },
  methods: {
    moreEvent () {
      this.search.currentPage = this.search.currentPage + 1
      let params = {
        currentPage: this.search.currentPage,
        pageSize: this.search.pageSize,
        tagId: this.tagid
      }
      console.log(params)
      userapi.getTagfanslistByid(params).then(rs => {
        if (rs.returnCode === 'F') {
          this.$message({
            type: 'error',
            message: `${rs.returnMsg}`
          })
          if (rs.errorCode === '000005') {
            this.$router.push({path: '/'})
          }
        } else {
          console.log(rs.data.items)
          this.restaurants = rs.data.items.concat(this.restaurants)
        }
      })
    },
    searchUser () {
      let node = []
      this.allUserList.forEach((rs, i) => {
        if (rs.nickName.indexOf(this.name) >= 0) {
          node.push(rs)
        }
      })
      this.restaurants = node
      this.$emit('update:checkedUserData', this.restaurants)
    },
    handleCheckAllChange (val) {
      this.checkedPersonal = val ? this.restaurants : []
      this.isIndeterminate = false
      console.log(val)
      this.$emit('update:checkedUserData', this.checkedPersonal)
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.restaurants.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.restaurants.length
      this.$emit('update:checkedUserData', value)
    }
  }
}
</script>
