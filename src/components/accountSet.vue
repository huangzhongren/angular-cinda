<template>
	<div class="settings">
		<p><span :class='["account",isSetting?"active":""]' @click='isSetting=true'>账户设置</span><span :class='["modifyPw",isSetting?"":"active"]' @click='isSetting=false'>修改密码</span></p>
		<div class='accountSet' v-if='isSetting'>
			<ul>
				<li class='portrait'>
					<div>当前头像：</div>
					<div></div>
				</li>
				<li class='username'>
					<div>姓名：</div>
					<div>
						<input type="text" v-model='user.name'>
						<span>{{error1}}</span>
					</div>
				</li>
				<li class='sex'>
					<div>性别：</div>
					<div>
						<input type="radio" name='sex' id='male' v-model='picked' value="1"><label for="male">男</label>
						<input type="radio" name='sex' id='female' v-model='picked' value="2"><label for="female">女</label>
					</div>
				</li>
				<li class='mail'>
					<div>邮箱：</div>
					<div>
						<input type="text" v-model='user.email' placeholder="请输入邮箱地址">
						<span>{{error2}}</span>
					</div>
				</li>
				<li class='region'>
					<div>所在地区：</div>
					<Distpicker :province='regionId|getProvice' :city='regionId|getCity' :area='regionId|getArea' @area='cc'></Distpicker>
				</li>
			</ul>
			<button class='save' @click='updateInfo'>保存</button>
		</div>
		<div v-else class='modify'>
			<ul>
				<li class='oldPw'>
					<div>旧密码</div>
					<div>
						<input type="text" v-model='oldPw'>
						<span>{{error3}}</span>
					</div>
				</li>
				<li class='newPw'>
					<div>新密码</div>
					<div>
						<input type="text" v-model='newPw' @blur='checkPw'>
						<span>{{error4}}</span>
					</div>
				</li>
				<li class='againPw'>
					<div>再次输入密码</div>
					<div>
						<input type="text" v-model='againPw' @blur='check'>
						<span>{{error5}}</span>
					</div>
				</li>
			</ul>
			<button class='save1' @click='modifyCode'>保存</button>
		</div>
	</div>
</template>
<script>
import ajax from 'axios'
import Distpicker from 'v-distpicker'
import {getProvice,getCity,getArea} from '../filters'
//console.log(getProvice)
	export default{
		data(){
			return {
				isSetting:true,//默认账户设置
				user:{},//用户对象
				picked:'',//单选值
				error1:'',//用户名提示信息
				error2:'',//邮箱提示信息
				error3:'',//旧密码提示信息
				error4:'',//新密码提示信息
				error5:'',//再一次输入提示信息
				regionId:'',
				oldPw:'',//旧密码
				newPw:'',//新密码
				againPw:''//再一次输入密码
			}
		},
		created(){
			this.$parent.isCur = 2;
			ajax.post('/xinda-api/member/info',{}).then(res=>{
				if(res.data.data!=null){
					this.regionId = res.data.data['regionId'];
					this.user = res.data.data;
					res.data.data.gender!=undefined?this.picked = res.data.data.gender:this.picked = '1';
				}
			})
		},
		filters:{
			getProvice,
			getCity,
			getArea
		},
		methods:{
			checkEmail(){//检查邮箱
				var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
				if(!reg.test(this.user.email)){
					this.error2 = '邮箱格式不正确'
					return false
				}else {
					return true
				}
			},
			cc(value){
                this.regionId = Distpicker.methods.getAreaCode(value)
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
			updateInfo(){//更新用户信息
				if(this.user.name==''){
					this.error1='请输入用户名'
				}else if (this.checkEmail()&&this.user.regionId!=''){
					console.log(this.user.name)
					console.log(this.user.email)
					console.log(this.regionId)
					this.ajax.post('/xinda-api/member/update-info',{
						headImg:this.user.headImg,
						name:this.user.name,
						gender:this.picked,
						email:this.user.email,
						regionId:this.regionId
					}).then(res=>{
						console.log(res)
					})
				}
			},
			modifyCode(){//修改密码
				if(this.checkPw()&&this.check()){
					this.ajax.post('/xinda-api/sso/change-pwd',this.qs.stringify({
						oldPwd: this.oldPw,	 
						newPwd: this.newPw
					})).then(res=>{
						console.log(res)
					})
				}
			}
		},
		components:{
			Distpicker
		}
	}
</script>
<style lang="less">
	.settings {
		width: 936px;
		float:right;
		p{
			height: 26px;
			margin-top: 5px;
			line-height: 26px;
			border-bottom: 2px solid #e9e9e9;
			span {
				width: 112px;
				height: 100%;
				font-size: 18px;
				text-align: center;
				display: inline-block;
				cursor: pointer;
				&.account {
					margin-left: 9px;
				}
				&.modifyPw {
					margin-left: 15px; 
				}
				&.active {
					color: #2693d4;
					border-bottom: 2px solid #2693d4;
				}
			}
		}
		.accountSet {
			li{
				overflow: hidden;
				>div {
					float:left;
					input {
						border: 1px solid #b0b0b0;
					}
				}
				>div:nth-child(1){
					width: 92px;
					margin-left: 2px;
				}
				&.username {
					height: 25px;
					line-height: 25px;
					margin-top: 27px;
					input {
						width: 182px;
						height: 23px;
					}
				}
				&.sex {
					height: 25px;
					line-height: 25px;
					margin-top: 24px;
				}
				&.mail {
					height: 26px;
					line-height: 25px;
					margin-top: 24px;
					input {
						width: 182px;
						height: 23px;
					}
				}
				&.region {
					height: 26px;
					line-height: 25px;
					margin-top: 20px;
					select {
						width: 77px;
						height: 25px;
						padding: 0;
						border: 1px solid #b0b0b0;
						border-radius: 0;
					}
				}
				&.portrait {
					height: 96px;
					line-height: 96px;
				}
			}
		}
		
		.save {
			width: 70px;
			height: 26px;
			display: block;
			line-height: 26px;
			text-align: center;
			color: #2693d4;
			border: 1px solid #2693d4;
			border-radius: 4px; 
			background: #fff;
			margin-top: 45px;
			margin-left: 94px;
		}
		.save1 {
			width: 70px;
			height: 26px;
			display: block;
			line-height: 26px;
			text-align: center;
			color: #2693d4;
			border: 1px solid #2693d4;
			border-radius: 4px; 
			background: #fff;
			margin-top: 29px;
			margin-left: 142px;
		}
		.modify {
			li {
				height: 25px;
				line-height: 25px;
				div {
					float:left;
					input {
						width: 182px;
						border: 1px solid #b0b0b0;
						height: 23px;
					}
				}
				>div {
					&:nth-child(1){
						width: 134px;
						padding-left: 7px;
					}
				}
				&.oldPw {
					margin-top: 37px;
				}
				&.newPw {
					margin-top: 20px;
				}
				&.againPw {
					margin-top: 19px;
				}
			}
		}
	}
</style>