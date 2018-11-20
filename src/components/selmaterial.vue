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
                <a href="" class="white-btn">同步</a>
                <div class="masonry"> 
                    <div class="item"> 
                       <div class="layer" :class="{show:currentindex === 1}"><img src="/static/images/right-ico.png" /></div>
                       <h1 class="date">
                          <span><img src="/static/images/wx-ico.jpg" />2018年8月8日更新</span>
                          <a href="">查看连接</a>
                       </h1>
                       <dl class="ant-col" @click="selSendcon(1)">
                         <dt> 
                            <img class="lazy" src="/static/images/1.png" alt="" />
                            <p>八大明星助阵！微信支付微信支付微信支付</p>
                         </dt>
                         <dd>
                            <div>另类变形记！富二代落魄后，竟凭一只狗翻身逆袭……</div>
                            <img src="/static/images/1.png" />
                         </dd>
                         <dd>
                            <div>另类变形记！富二代落魄后，竟凭一只狗翻身逆袭……</div>
                            <img src="/static/images/1.png" />
                         </dd>
                       </dl>
                    </div>
                    <div class="item"> 
                      <div class="layer" :class="{show:currentindex === 2}"><img src="/static/images/right-ico.png" /></div>
                       <h1 class="date">
                            <span><img src="/static/images/wx-ico.jpg" />2018年8月8日更新</span><a href="">查看连接</a>
                       </h1>
                       <dl  class="ant-col" @click="selSendcon(2)">
                         <dt> <img class="lazy" src="/static/images/5.jpg" alt="" /></dt>
                         <dd>
                            <div>另类变形记！富二代落魄后，竟凭一只狗翻身逆袭……</div>
                         </dd>
                         <dd>
                            <div>另类变形记！富二代落魄后，竟凭一只狗翻身逆袭……</div>
                             <img src="/static/images/1.png" />
                         </dd>
                       </dl>
                    </div> 
                </div>
                <a  href="javascript:" class="load-more">加载更多...</a>
            </div>
        </div>
</template>
<script>
   export default{
      data(){
         return{
            text:'',
            content:'',
            currentindex: '',
            typeData:["文字","图文消息","图片","语音","视频"],
            cur:0
         }
      },
      props:["current","message","id"],
      methods:{
         selType(index){ //选择群发类型
            this.cur =  index 
            this.$emit('update:current',index)
         },
         selSendcon(id){
            this.currentindex=id
            this.$emit('update:id',id)
         }
      },
      watch:{
         current(val){
            this.cur = val
            console.log(val)
         },
         text(val){
            this.$emit('update:message',val)
         }
         //hide(val){
				//this.ishide = val;
			//}
      }
   }
</script>