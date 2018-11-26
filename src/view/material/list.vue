<template>
    <div class="material-items">
        <el-button type="primary" @click = "syncData">同步图文素材</el-button>
        <div class="news-list">
            <div class="items"  v-for="(item,index) in materialData" :key = "index">
                <dl>
                    <dd :class="{first : i == 0}" v-for="(data,i) in item.wechatArticleList" :key = "i">
                        <span><a :href="data.url" target="_blank">{{data.title}}</a></span>
                        <img :src="data.thumbMediaId " />
                    </dd>
                </dl>
                <div class="time">{{$common.getDate(item.updateTime,false)}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import materialapi from  '../../api/materialapi'
export default {
    data(){
        return{
            materialapi : materialapi,
            href:'',
            src:'',
            materialData: []
        }
    },
    created(){},
    methods:{
        syncData(){
            this.materialapi.getList().then(rs => {
                if(rs.returnCode == "F") {
                    this.$message({
                        message: `${rs.returnMsg}`,
                        center: true,
                        type:'error'
                    });
                }else{
                    let params ={"types":"news"}
                    this.materialapi.getMediaListByType(params).then(rs => {
                        if(rs.returnCode == "F"){
                             this.$message({
                                message: `${rs.returnMsg}`,
                                center: true,
                                type:'error'
                            });
                        }else{
                           this.materialData = rs.data.items
                           console.log(rs.data.items)
                        }
                    })
                }
            })
        }
    }
}
</script>
