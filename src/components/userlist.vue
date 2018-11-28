<template>
    <div class="userlist-box">
        <div class="search-box">
              搜索用户：<el-input  v-model="state4"    placeholder="请输入用户昵称" style="width:200px"></el-input>
              <el-button type="primary"   @click="searchUser">搜索</el-button>
        </div>
        <template>
            <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
            <div class="list">
                <el-checkbox-group v-model="checkedPersonal" @change="handleCheckedCitiesChange">
                    <el-checkbox class="checkbox" v-for="(item,index) in restaurants" :label="item" :key="index">
                        <div class="personal-col">{{item.nickName}}<img :src = "item.headImgUrl" /></div>
                    </el-checkbox>
                </el-checkbox-group>
            </div>
        </template>
    </div>
</template>
<script>
import bus from '../until/eventbus.js'
export default {
    data(){
        return{
            state4: "",
            checkAll: false,
            checkedPersonal: [],
            isIndeterminate: true,
            allUserList:[],
            restaurants:[] //该标签下所有用户
        }
    },
    props:["checkedUserData"],
    created(){
        bus.$on("node",obj => {
            this.allUserList = obj
            this.restaurants = obj
        })
    },
    methods: {
      searchUser(){
          let node = []
          this.allUserList.forEach((rs,i) => {
                if(rs.nickName.indexOf(this.state4)>=0){
                    node.push(rs)
                }
            });
          this.restaurants = node
          this.$emit("update:checkedUserData", this.restaurants)
      },
      /*handleCheckAllChange(val) {
        this.checkedPersonal = val ? this.restaurants : []
        this.isIndeterminate = false
        this.$emit("update:checkedUserData", this.checkedPersonal)
      },*/
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.restaurants.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.restaurants.length
        this.$emit("update:checkedUserData", value)
      }
    }
}
</script>
