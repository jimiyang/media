<template>
    <div class="material-items">
        <el-button type="primary" @click = "syncData">同步图文素材</el-button>
        <div class="news-list">
            <div class="items"  v-for="(item,index) in materialData" :key = "index">
                <dl>
                    <dd :class="{first : i == 0}" v-for="(data,i) in item.wechatArticleList" :key = "i">
                        <span>{{data.title}}</span>
                        <img src="/static/images/1.png" />
                    </dd>
                </dl>
                <div class="time">08月16日 18：00</div>
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
            materialData: []
        }
    },
    created(){
        console.log(this.$common.getDate(new Date()))
    },
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
