<template>
    <div class="all-send">
        <div class="blocks">
            <div class="send-content">
                <div class="notice">
                    <h1>每日高级可群发的次数至少100次，定向发送获取更佳的用户体验，但对所有粉丝群发仍是每月4次（且与公众平台同步）。</h1>
                    <p>请注意这种情况，如果某个粉丝身上有3个标签，群发3个标签他就会收到3次推送。</p>
                </div>
                <h1 class="title">设置群发内容</h1>
                <a href="javascript:" class="white-btn select" @click="dialogVisible = true">选择群发内容</a>
                <h1 class="title">选择群发对象
                    <span>需要发给同时拥有A和B标签的粉丝？</span>
                </h1>
                <ul class="lab-blocks" >
                    <li v-for="(item,i) in labList" :key="i" :class="item.id==index ? 'checked':''"  @click="selLab(item.id)">{{item.name}}</li>
                </ul>
                <h1 class="title">定时发送及原创校验</h1>
                <div class="ant-items">
                    <div>
                        <label>定时开关 </label>
                        <el-switch  v-model="timingChecked"  active-color="#4993ff"  inactive-color="#E0E0E0"></el-switch>
                        配合关注时间设置，可实现自动化的定期发送效果。
                        <el-tooltip  effect="dark"  placement="top">
                                <div slot="content">举例：选择关注时间为下周二的粉丝，定时<br/>发送时间设置为下周三，即可实现下周二关<br/>注的粉丝自动在下周三收到群发消息推送。</div>
                                <el-button>如何操作？</el-button>
                        </el-tooltip>
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
                <div class="news-list">
                    <div class="items">
                        <dl>
                            <dd v-for= "(items,i) in newsData" :key="i" v-if="i==0"   class="first" >
                                <img src="../../assets/1.png" />
                                <p>哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
                            </dd>
                            <dd v-else>
                                <span>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</span>
                                <img src="../../assets/0.jpg" />
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
       <div class="ant-btn">
            <a href="javascript:" class="white-btn" @click="phonePreview">发送到手机预览</a>
            <a href="javascript:" class="blue-btn" @click="sendSubmit">立即高级群发</a>
            <span>预计发送人数：{{sendNum}}</span>
        </div>
        <el-dialog  title="提示"  :visible.sync="dialogVisible"  @close='closeDialog'  width="600">
            <selmaterial  :id.sync="getId"></selmaterial>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import selmaterial from './selmaterial'  
    import api from  '../../api/get.js'
    console.log(api)
    export default{
        data(){
            return{
                api,
                timingChecked:false,
                reprintChecked:true,
                sendNum:20, //发送人数
                html:'',
                dialogVisible: false,
                ishide:true,
                getId:'',
                index:1,
                newsData:0,
                current:0,
                labList:[{id:1,name:"所有粉丝"},
                    {id:2,name:"星标组"},
                    {id:3,name:"电商"},
                    {id:4,name:"游戏"},
                    {id:5,name:"男"},
                    {id:6,name:"女"}]
            }
        },
        components:{selmaterial},
        created(){
            let parmas = {page:1,size:10,memberId:60587,status:1}
            //this.api.getList(parmas).then((rs)=>{
                //console.log(rs)
            //})
        },
        methods:{
            closeDialog(){
                this.newsData=5;
            },
            selLab(id){
                this.index=id;
            },
            phonePreview(){ //手机预览
                console.log(this.getId)
            },
            sendSubmit(){ //高级群发
               
            }
        }
    }
</script>