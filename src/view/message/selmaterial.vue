<template>
     <div class="material-list">
            <ul class="type">
                <li class="active">文字</li>
                <li>图文消息</li>
                <li>图片</li>
                <li>语音</li>
                <li>视频</li>
            </ul>
            <div class="content"> 
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
                
                <div class="notice">仅显示微图文消息</div>
                <a href="" class="white-btn">同步</a>
                <div class="masonry"> 
                    <div class="item"> 
                       <div class="layer" :class="{show:currentindex === 1}"></div>
                       <h1 class="date">
                          <span><img src="../../assets/wx-ico.jpg" />2018年8月8日更新</span>
                          <a href="">查看连接</a>
                       </h1>
                       <dl class="ant-col" @click="selSendcon(1)">
                         <dt> 
                            <img class="lazy" src="../../assets/1.png" alt="" />
                            <p>八大明星助阵！微信支付微信支付微信支付</p>
                         </dt>
                         <dd>
                            <div>另类变形记！富二代落魄后，竟凭一只狗翻身逆袭……</div>
                            <img src="../../assets/1.png" />
                         </dd>
                         <dd>
                            <div>另类变形记！富二代落魄后，竟凭一只狗翻身逆袭……</div>
                            <img src="../../assets/1.png" />
                         </dd>
                       </dl>
                    </div>
                    <div class="item"> 
                      <div class="layer" :class="{show:currentindex === 2}"></div>
                       <h1 class="date">
                            <span><img src="../../assets/wx-ico.jpg" />2018年8月8日更新</span><a href="">查看连接</a>
                       </h1>
                       <dl  class="ant-col" @click="selSendcon(2)">
                         <dt> <img class="lazy" src="../../assets/5.jpg" alt="" /></dt>
                         <dd>
                            <div>另类变形记！富二代落魄后，竟凭一只狗翻身逆袭……</div>
                         </dd>
                         <dd>
                            <div>另类变形记！富二代落魄后，竟凭一只狗翻身逆袭……</div>
                             <img src="../../assets/1.png" />
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
            currentindex: ''
         }
      },
      props:["id"],
      methods:{
         change(){
            alert();
         },
         selSendcon(id){
           
            this.currentindex=id
            console.log(this.currentindex)
            //this.$emit('update:hide',false);
            this.$emit('update:id',id)
         }
      },
      watch:{
         //hide(val){
				//this.ishide = val;
			//}
      }
   }
</script>

<style scoped>
   .layer{display:none;}
   .layer.show{display: block}
</style>