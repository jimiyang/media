<template>
    <div class="all-send">
        <div class="blocks">
            <div class="send-content">
                <div class="notice">
                    <h1>每日高级可群发的次数至少100次，定向发送获取更佳的用户体验，但对所有粉丝群发仍是每月4次（且与公众平台同步）。</h1>
                    <p>请注意这种情况，如果某个粉丝身上有3个标签，群发3个标签他就会收到3次推送。</p>
                </div>
                <h1 class="title">设置群发内容</h1>
                <a href="javascript:" class="white-btn select" @click="open">选择群发内容</a>
                <h1 class="title">选择群发对象</h1>
                <ul class="lab-blocks">
                    <li>所有粉丝</li>
                    <li>星标组</li>
                    <li>电商</li>
                    <li>游戏</li>
                    <li>长毛羊</li>
                    <li>男</li>
                    <li>女</li>
                </ul>
                <h1 class="title">定时发送及原创校验</h1>
                <div class="ant-items">
                    <div>
                        <label>定时开关 </label>
                        <el-switch  v-model="timingChecked"  active-color="#4993ff"  inactive-color="#E0E0E0"></el-switch>
                        配合关注时间设置，可实现自动化的定期发送效果。<a href="">如何操作？</a>
                    </div>
                    <div>
                        <label>转载形式</label>
                        <el-switch  v-model="reprintChecked"  active-color="#4993ff"  inactive-color="#E0E0E0"></el-switch>
                        当群发内容被微信判定为转载时，将自动替换为原文章内容发送且注明转载来源。
                    </div>
                </div>
            </div>
            <div class="preview-blocks">
                <h1 class="title">微信预览器</h1>
            </div>
        </div>
       <div class="ant-btn">
            <a href="" class="white-btn">发送到手机预览</a>
            <a href="" class="blue-btn">立即高级群发</a>
            <span>预计发送人数：{{sendNum}}</span>
        </div>
        <div class="material-list">
            <ul class="type">
                <li class="active">文字</li>
                <li>图文消息</li>
                <li>图片</li>
                <li>语音</li>
                <li>视频</li>
            </ul>
            <div class="content"> 
                <div class="notice">仅显示微图文消息</div>
                <a href="" class="white-btn">同步</a>
                <div class="masonry"> 
                    <div class="item"> 
                       <h1 class="date">
                          <span><img src="../../assets/wx-ico.jpg" />2018年8月8日更新</span><a href="">查看连接</a>
                       </h1>
                       <dl>
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
                       <h1 class="date">
                            <span><img src="../../assets/wx-ico.jpg" />2018年8月8日更新</span><a href="">查看连接</a>
                       </h1>
                       <dl>
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
    </div>
</template>
<script>
    export default{
        data(){
            return{
                value:'',
                timingChecked:false,
                reprintChecked:true,
                sendNum:20, //发送人数
                html:'',
                options:[
                        {value:"兑奖成功",label:"兑奖成功"},
                        {value:"新会员加入通知",label:"新会员加入通知"}
                      ]
            }
        },
        created(){
            this.html=`<div class="material-list">
            <ul class="type">
                <li class="active">文字</li>
                <li>图文消息</li>
                <li>图片</li>
                <li>语音</li>
                <li>视频</li>
            </ul>
            <div class="content"> 
            </div>
        </div>`
        },
        methods:{
            open(){
                let  _this = this
                this.$alert(`${_this.html}`, 'HTML 片段', {
                dangerouslyUseHTMLString: true
                });
            }
        }
    }
</script>