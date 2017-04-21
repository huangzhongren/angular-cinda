<template>
	<div class="denglu">
        <div class="denglu-denglu">
            <div class="denglu-left">
                <div class="denglu-box">
                    <div class="denglu-l">
                        <input type="text" placeholder = "请输入手机号码" style="width:281px;height:37px;font-size: 18px" @blur='checkPhone' @focus='error1=""' v-model='phoneNum'>
                        <span>{{error1}}</span>
                    </div>
                    <div class="denglu-l">
                        <input type="text" placeholder="请输入密码" style="width:281px;height:37px;font-size: 18px" v-model='passWord' @focus='error2=""'>
                        <span>{{error2}}</span>
                    </div>
                    <div class="denglu-l">
                        <input type="text" placeholder="请输入验证码" style="width:172px;height:37px;font-size: 18px"  v-model='imgCode' @focus='error3=""'>
                        <span>{{error3}}</span>
                        <div class='validateCode'><img :src="imgCodeUrl" alt="验证码" @click='imgCodeUrl=getImgCodeUrl(imgCodeUrl)' ></div>
                        <a class='forget' href='/forgetPd'>忘记密码?</a>
                    </div>
                    <div class="denglu-l">
                        <button type="submit" style="width:281px;height:36px;" @click='login'>立即登录</button>
                        <span>{{error4}}</span>
                    </div>
                </div>
            </div>
            <div class="denglu-center"></div>
            <div class="denglu-right">
                <p class="p1">还没有账号？</p>
                <a class="p2" href="/register">立即注册>></a>
                <img src="../assets/login/man.jpg">
            </div>
        </div>
        <p class="denglu-footer">Copyright 2016 北京信达科技有限公司 京ICP备 16011621号</p>
    </div>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return {
                imgCodeUrl:"/xinda-api/ajaxAuthcode",
                error1:"",//手机号码验证错误信息
                error2:"",//密码提示信息
                error3:"",//验证码提示信息
                error4:"",//登录失败提示
                phoneNum:"",//手机号码
                imgCode:'',//图片验证码
                passWord:''//用户密码
			}

		},
		created(){
			this.setIllogin(false)
			this.setTips("欢迎登陆")
		},
		methods:{
			...mapActions(['setIllogin','setTips','setLogined']),
			checkPhone(){
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
            login(){
                if(this.checkPhone()){
                    if(this.imgCode==""){
                        this.error3="请输入验证码"
                    }else {
                        //调用登录接口
                        this.ajax.post('/xinda-api/sso/login',this.qs.stringify({
                            loginId: this.phoneNum,
                            password:this.passWord,
                            imgCode:this.imgCode   
                        })).then(res=>{
                            if(res.data.status==1){
                                this.$router.push({path:"/"})
                            }else {
                                //切换验证码
                                this.imgCodeUrl=this.getImgCodeUrl(this.imgCodeUrl);
                                this.error4 = '登录名或密码错误'
                            }
                        })
                    }
                }
            }
		}
		
	}
</script>
<style lang='less'>
.denglu {
    width: 100%;
    height: 709px;
    background-color: #f5f5f5;
    padding-top: 52px;
}

.denglu-denglu {
    width: 1200px;
    height: 435px;
    background-color: #fff;
    margin: 0 auto;
}

.denglu-left {
    width: 587px;
    height: 382px;
    position: relative;
    float: left;
}
.validateCode {
    position:absolute;
	height: 37px;
    left: 188px;
    top: 0;
    img {
        height: 100%;
    }
}
.forget {
    display: block;
	margin-top: 30px;
   	margin-left: 213px;   
}
.denglu-box {
    position: absolute;
    top: 53px;
    left: 147px;
}
.denglu-l {
	margin-bottom: 24px;
    position: relative;
}
.denglu-l input {
    border: 1px solid #cecece;
    border-radius: 3px;
    color: #cecece;
    box-sizing: border-box;
    padding-left: 10px;
}
.denglu-l span {
    width: 100%;
    height: 37px;
    line-height: 37px;
    position: absolute;
    left: 286px;
    top:0;
    color: #2693d4;
    font-size: 14px;
}
.denglu-l p {
    margin-bottom: 30px;
    color: #2693d4;
    position: relative;
    left: 213px;
    font-size: 14px;
}

.denglu-l button {
    border: 1px solid #2693d4;
    width: 281px;
    height: 37px;
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

.denglu-right {
    float: left;
}

.denglu-right .p1 {
    margin-top: 43px;
    margin-left: 188px;
    font-size: 18px;
}

.denglu-right .p2 {
    display: block;
    margin-top: 23px;
    margin-left: 188px;
    color: #2693d4;
    font-size: 18px;
}

.denglu-right img {
    margin-top: 19px;
    margin-left: 188px;
}

.denglu-footer {
    width: 440px;
    height: 12px;
    margin: 0 auto;
    margin-top: 187px;
    font-size: 14px;
    color: #000;
    font-family:"微软雅黑";
}
</style>
