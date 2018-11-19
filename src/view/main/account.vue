<template>
    <div class="account-list" :class="{open:isopen}">
        <div class="title">
            <a href="javascript:" class="back" @click="back">返回</a>
            <div>
                <span @click="change(0,'公众号')"  :class="{checked: ischecked==0}">公众号</span>
                <span  @click="change(1,'小程序')" :class="{checked: ischecked==1}">小程序</span>
            </div>
            <a href="javascript:" class="add">+{{name}}</a>
        </div>
        <ul class="list">
            <li>
                <img src="/static/images/0.jpg" />
                <div>
                    <h1>未知名称</h1>
                    <p>认证服务号</p>
                </div>
            </li>
             <li>
                <img src="/static/images/0.jpg" />
                <div>
                    <h1>未知名称</h1>
                    <p>认证服务号</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                name:'公众号',
                ischecked:0,
                isopen:false
            }
        },
        props:['open'],
        methods:{
            change(index,item){
                this.ischecked = index
                this.name = item
            },
            back(){
                this.$emit('update:open',false)
                this.isopen = false 
            }
        },
        watch:{
            open(val){
                this.isopen = val
                this.$emit('update:open',val)
            }
        }
    }
</script>