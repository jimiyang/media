<template>
    <div class="fun-items">
        <div class="search-box">
            <div class="items">粉丝名称：<el-input v-model="input" placeholder="请输入粉丝名称或openid" style="width:200px;"></el-input></div>
            <div class="items">微信标签：
                <el-select v-model="value5" multiple placeholder="微信标签">
                    <el-option
                    v-for="item in data"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="items">性别：
                <el-select v-model="sex" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="items">
                粉丝地域：
                <el-cascader
                    :options="options"
                    v-model="selectedOptions"
                    @change="handleChange">
                </el-cascader>
            </div>
        </div>
        <div class="ant-btn">
            <a href="javacript:" class="blue-btn" @click="searchUser">搜索</a>
            <a href="javacript:" class="white-btn" @click="reset">重置</a>
        </div>
        <div class="count">搜索到{{funcount}}个粉丝</div>
        <div class="opeart-btn">
            <a href="javacript:" class="blue-btn" @click="updateUser">同步数据</a>
            <a href="javacript:" class="white-btn" @click="operation">批量操作</a>
        </div>
        <el-table class="tab-list" ref="multipleTable" :data="fansData"   style="width:100%;">
            <el-table-column   type="selection" width="55"></el-table-column>
            <el-table-column   prop="nickName"  label="用户昵称" ></el-table-column>
            <el-table-column   prop="city"  label="地域" >
              <template slot-scope="scope"> 
                {{scope.row.country}}  {{scope.row.province}}  {{scope.row.city }}  
              </template>
            </el-table-column>
            <el-table-column   prop="subscribeScene"  label="关注来源"></el-table-column>
            <el-table-column   prop="subscribeTimeLengthStr"  label="关注时长"></el-table-column>
            <el-table-column   prop="interactiveCount"  label="互动数"></el-table-column>
            <el-table-column   prop="lastInteractDate"  label="上次互动时间"></el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="search.currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size.sync="search.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>
<script>
  import userapi from '../../api/userapi'
  export default {
    data() {
      return {
        userapi:userapi,
        input:"",
        value5:[],
        sex:"",
        funcount:1000,
        fansData: [],
        search:{
          currentPage:1,
          pageSize:10
        },
        totalCount:0,
        data: [{
          value: '选项1',
          label: '黄金糕',
          key: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶',
          key: '黄金糕'
        }, {
          value: '选项3',
          label: '蚵仔煎',
          key: '黄金糕'
        }, {
          value: '选项4',
          label: '龙须面',
          key: '黄金糕'
        }, {
          value: '选项5',
          label: '北京烤鸭',
          key: '黄金糕'
        }],
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }]
        }],
        selectedOptions: []
      };
    },
    created(){
       this.loadList()
    },
    methods: {
      loadList(){
         this.userapi.getFanslist(this.search).then(rs => {
             if(rs.returnCode == "F"){
                this.$message({
                  type: 'error',
                  message: `${rs.returnMsg}`
                })
             }else{
                this.totalCount =  rs.data.totalNum
                this.fansData = rs.data.items
             }
         })
      },
      handleSizeChange(val){
          this.search.pageSize = val
          this.loadList()
      },
      handleCurrentChange(val){
           this.search.currentPage = val
           this.loadList()
      },
      handleChange(value) {
        
      }
    }
  };
</script>