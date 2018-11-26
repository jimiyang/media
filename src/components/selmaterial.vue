<template>
     <div class="material-list">
            <ul class="type">
                <li v-for="(item,index) in typeData" :class="{active:index==cur}"  :key="index" @click="selType(index)">{{item}}</li>
            </ul>
            <div class="image-text" :class="{show:cur == 0}">
               <div class="txt-content">
                     <div class="items">
                        <h1>编辑区</h1>
                        <textarea v-model="text" row="2"></textarea>
                     </div>
                     <div class="items ant-col">
                        <h1>预览区</h1>
                        <div class="">{{text}}</div>
                     </div>
               </div>
              <el-tooltip placement="top">
                  <div slot="content">如何发送文字链接</div>
                  <el-button>如何发送文字链接?</el-button>
              </el-tooltip>
            </div>
            <div class="image-text"  :class="{show:cur == 1}"> 
                <div class="notice">仅显示微图文消息</div>
                <a href="javascript:" class="white-btn" @click = "syncData">同步</a>
                <div class="masonry"> 
                    <div class="item" v-for="(node,index) in materialData" :key = "index"> 
                       <div class="layer" :class="{show:currentindex === index}"><img src="/static/images/right-ico.png" /></div>
                       <h1 class="date">
                          <span><img src="/static/images/wx-ico.jpg" />{{$common.getDate(node.updateTime,false)}}更新</span>
                          <a href="javascript:">查看连接</a>
                       </h1>
                       <dl class="ant-col" @click="selSendcon(index,node.wxMediaId)">
                         <dd :class="{first: i == 0}"  v-for="(item, i) in node.wechatArticleList" :key = "i" > 
                            <div><a :href="item.url" target="_blank">{{item.title}}</a></div>
                            <img class="lazy" :src="node.thumbMediaUrl" alt="" />
                         </dd>
                       </dl>
                    </div>
                </div>
                <a  href="javascript:" class="load-more">加载更多...</a>
            </div>
        </div>
</template>
<script>
   import materialapi from  '../api/materialapi'
   export default{
      data(){
         return{
            materialapi: materialapi,
            text:'',
            content:'',
            currentindex: '',
            typeData:["文字","图文消息","图片","语音","视频"],
            cur:0,
            materialData:[]
         }
      },
      props:["current","message","mediaid"],
      created(){
         
      },
      methods:{
         syncData() {
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
                           console.log(this.materialData)
                        }
                    })
                }
            })
         },
         selType(index){ //选择群发类型
            this.cur =  index 
            this.$emit('update:current',index)
         },
         selSendcon(id,mediaid){
            this.currentindex=id
            this.$emit('update:mediaid',mediaid)
         }
      },
      watch:{
         current(val){
            this.cur = val
         },
         text(val){
            this.$emit('update:message',val)
            this.$emit('update:current',0)
         }
      }
   }
</script>