<template>
    <div class="material-items">
        <el-button type="primary" @click = "syncData">同步图文素材</el-button>
        <div class="news-list">
            <div class="items"  v-for= "(item,index) in materialData" :key= "index">
                <dl>
                    <dd :class= "{first : i === 0}" v-for= "(data,i) in item.wechatArticleList" :key = "i">
                        <span><a :href= "data.url" target="_blank">{{data.title}}</a></span>
                        <img :src= "data.thumbMediaUrl " />
                    </dd>
                </dl>
                <div class="time">{{$common.getDate(item.updateTime,false)}}</div>
            </div>
        </div>
        <div class="g-tc blue-color more" @click= "moreEvent" v-if= "totalNum > search.pageSize">{{message}}</div>
    </div>
</template>
<script>
import materialapi from  '../../api/materialapi'
export default {
    data () {
        return{
            materialapi : materialapi,
            message: '加载更多图文素材...',
            flag: false,
            materialData: [],
            totalNum: 0,
            totalPage: 1,
            search:{
                'type': 'news',
                'currentPage': 1,
                'pageSize': 5
            }
        }
    },
    created(){
        this.getMeadiaList()
    },
    methods:{
        moreEvent(){
           if(this.search.currentPage>=this.totalPage) {
               this.search.currentPage = this.totalPage
                this.$message({
                    message: `已经是最后一页了！`,
                    center: true,
                    type:'warning'
                });
           }else{
             this.search.currentPage = this.search.currentPage + 1
             if(this.search.currentPage == this.totalPage){
                    this.message = "已经是最后一页了"
             }
             this.getMeadiaList()
           }
        },
        getMeadiaList(){
            this.materialapi.getMediaListByType(this.search).then(rs => {
                if(rs.returnCode === 'F'){
                    this.$message({
                        message: `${rs.returnMsg}`,
                        center: true,
                        type:'error'
                    });
                    if(rs.errorCode === '000005'){
                        this.$router.push({path:'/'})
                    }
                }else{
                    console.log(this.flag)
                    if(this.flag == false){
                         this.materialData = rs.data.items.concat(this.materialData)
                    }else{
                         this.materialData = rs.data.items 
                    }
                    this.totalNum = rs.data.totalNum
                    this.totalPage = rs.data.totalPage
                    console.log(rs.data.items.concat(this.materialData))
                }
            })
        },
        syncData(){
            this.flag = true 
            this.search.currentPage = 1
            this.materialapi.getList().then(rs => {
                if(rs.returnCode === 'F') {
                    this.$message({
                        message: `${rs.returnMsg}`,
                        center: true,
                        type:'error'
                    });
                    if(rs.errorCode === '000005'){
                        this.$router.push({path:'/'})
                    }
                }else{
                   this.getMeadiaList()
                }
            })
        }
    }
}
</script>
