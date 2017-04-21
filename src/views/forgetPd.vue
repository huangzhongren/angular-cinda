<template>
    <div class="wangji">
        <div class="wangji-wangji">
            <div class="wangji-left">
                <div class="wangji-box">
                    <div class="wangji-l">
                        <input type="text" placeholder="请输入手机号码" style="width:281px;height:37px;font-size: 18px" v-model='phoneNum' v-on:blur='checkPhone' v-on:focus='error1=""'>
                        <span>{{error1}}</span>
                    </div>
                    <div class="wangji-l">
                        <input type="text" placeholder="请输入验证码" style="width:172px;height:37px;font-size: 18px" v-model='imgCode' v-on:focus='error2=""'>
                        <img :src="imgCodeUrl" @click='imgCodeUrl=getImgCodeUrl(imgCodeUrl)'>
                        <span>{{error2}}</span>
                    </div>
                    <div class="wangji-l">
                        <input type="text" placeholder="请输入验证码" style="width:172px;height:37px;font-size: 18px" v-model='validCode' @focus='error3=""'>
                        <button class='getCode' v-on:click='getMsg'>点击获取</button>
                        <span>{{error3}}</span>
                    </div>
                    <div class="wangji-l">
                        <input type="text" placeholder="请输入新密码" style="width:281px;height:37px;font-size: 18px" @blur="checkPw" v-model='newPw'>
                        <span>{{error4}}</span>
                    </div>
                    <div class="wangji-l">
                        <input type="text" placeholder="请再次确认密码" style="width:281px;height:37px;font-size: 18px" @blur="check" v-model='againPw'>
                        <span>{{error5}}</span>
                    </div>
                    <div class="wangji-l">
                        <button type="submit" class='confirm' @click='modify'>{{tips}}</button>
                    </div>
                </div>
            </div>
            <div class="denglu-center"></div>
            <div class="wangji-right">
                <p class="p1">想起密码来了？</p>
                <a class="p2" href='/validate'>返回登陆>></a>
                <img src="images/dengluye.png">
            </div>
        </div>
        <p class="wangji-footer">Copyright 2016 北京信达科技有限公司 京ICP备 16011621号</p>
    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    export default{
        data(){
            return {
                phoneNum:"",
                imgCode:'',//图片验证码
                validCode:'',//短信验证码
                error1:"",//手机号码验证错误信息
                error2:"",//验证码验证信息
                error3:"",//短信密码验证信息
                error4:"",//新密码提示信息
                error5:"",//再次输入提示信息
                tips:"",//短信状态提示信息
                imgCodeUrl:"/xinda-api/ajaxAuthcode",
                newPw:"",//新密码
                againPw:"",//再次输入的密码
                tips:"确认修改"
            }
        },
        created(){
            this.setIllogin(false);
            this.setTips('忘记密码')
        },
        methods:{
            checkPhone(){//检查手机号
                if(this.phoneNum==''){
                    this.error1 = '手机号码不能为空'
                    return false
                }else if(!/^1[34578]\d{9}$/.test(this.phoneNum)){
                    this.error1 = '手机号码不正确'
                    return false
               }else{
                    return true
               }
            },
            checkPw(){//检查密码输入
                if(this.newPw==''){
                    this.error4 = '密码不能为空'
                    return false
                }else {
                    return true
                }
            },
            check(){//检查密码两次是否一致
                if(this.newPw!=this.againPw){
                    this.error5 = '两次密码输入不一致'
                    return false
                }else {
                    return true
                }
            },
            checkImfCode(){//检查验证码
                if(this.imgCode==''){
                    this.error2 = '验证码不能为空'
                    return false
                }else{
                    return true
                }
            },
            getMsg(){//点击获取短信验证码
                if(this.checkPhone()&&this.checkImfCode()){//判断手机号码是否符合规则
                    //获取短信验证码
                    this.ajax({
                        url:'/xinda-api/register/sendsms?cellphone='+this.phoneNum+'&smsType=1&imgCode='+this.imgCode,
                        method:'post',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(res=>{
                        console.log(res);
                        this.error3 = res.data.msg
                    })
                }
            },
            modify(){//确认修改
                if(this.checkPhone()&&this.checkImfCode()&&this.checkPw()&&this.check()){
                    this.ajax.post('/xinda-api/register/findpas',this.qs.stringify({
                        cellphone: this.phoneNum ,                 
                        smsType:1 ,                              
                        validCode:this.validCode ,                     
                        password:this.againPw
                    })).then(res=>{
                        this.tips = res.data.msg;
                        if(res.data.status==1){
                            this.$router.push({path:"/validate"})
                        }
                    })
                }
            },
            ...mapActions(['setIllogin','setTips'])
        }
    }
</script>
<style>
* {
    margin: 0;
    padding: 0;
    border: 0;
}
.wangji {
    width: 100%;
    height: 653px;
    background-color: #f5f5f5;
    padding-top: 52px;
}
.wangji-wangji {
    width: 1200px;
    height: 435px;
    background-color: #fff;
    margin: 0 auto;
}

.wangji-left {
    width: 587px;
    height: 382px;
    position: relative;
    float: left;
}

.wangji-left img {
    position: absolute;
    height: 35px;
    left: 182px;
}

.wangji-box {
    position: absolute;
    top: 53px;
    left: 147px;
}
.wangji-l {
    position:relative;
}
.wangji-l input {
    border: 1px solid #cecece;
    margin-bottom: 19px;
    border-radius: 3px;
    color: #cecece;
    box-sizing: border-box;
    padding-left: 10px;
}
.wangji-l span {
    width: 100%;
    height: 37px;
    line-height: 37px;
    position: absolute;
    left: 286px;
    top:0;
    color: #2693d4;
    font-size: 14px;
}
.wangji-l .confirm {
    width: 281px;
    height: 37px;
    border: 1px solid #2693d4;
    color: #2693d4;
    background-color: #fff;
    border-radius: 3px;
    font-size: 18px;
}

.denglu-center {
    float: left;
    height: 260px;
    border-right: 1px solid #dadada;
    margin: 82px auto;
}

.wangji-right {
    float: left;
}

.wangji-right .p1 {
    margin-top: 43px;
    margin-left: 188px;
    font-size: 18px;
}

.wangji-right .p2 {
    margin-top: 23px;
    margin-left: 188px;
    color: #2693d4;
    font-size: 18px;
}

.wangji-right img {
    margin-top: 19px;
    margin-left: 188px;
}
.wangji-footer {
    width: 440px;
    height: 12px;
    margin: 0 auto;
    margin-top: 118px;
    font-size: 14px;
    color: #000;
    font-family:"微软雅黑";
}
</style>
