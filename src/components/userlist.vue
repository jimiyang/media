<template>
    <div class="userlist-box">
        <div class="search-box">
              <el-autocomplete  v-model="state4"   :fetch-suggestions="querySearchAsync"   placeholder="请输入内容"  @select="searchUser"></el-autocomplete>
        </div>
        <template>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <div class="list">
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox class="checkbox" v-for="city in cities" :label="city" :key="city">
                        <div class="personal-col">吉米小绵羊<img src="../../../static/images/0.jpg" /></div>
                    </el-checkbox>
                </el-checkbox-group>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    data(){
        return{
            state4: "",
            checkAll: false,
            checkedCities: ['上海', '北京'],
            cities: ['上海', '北京', '广州', '深圳'],
            isIndeterminate: true,
            restaurants: []
        }
    },
    methods: {
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      searchUser(){

      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    }
}
</script>
