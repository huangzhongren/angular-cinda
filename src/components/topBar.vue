<template>
	<div class='topBar'>
		<div class='container'>
			<a href="javascript:void(0)" v-show='logined'>{{username}}</a>
			<span>欢迎来到信达！</span>
			<a v-show='logined' @click='logout'>【退出】</a>
			<a href="/validate" class='login' v-show='!logined' >登录</a>
			<a href="/register" class='register' v-show='!logined'>快速注册</a>
			<a href="javascript:void(0)" class='spAccess'>服务商入口</a>
			<div class='myOrder' @click='goVip' v-show='logined'><span></span>我的订单</div>
			<div class='cart'><span class='cartIcon'></span>购物车<span class='goodsNum'>{{cartNum}}</span>件</div>
		</div>
	</div>
</template>
<script>
import ajax from 'axios'
import {mapGetters,mapActions} from 'vuex'
	export default{
		data(){
			return {
				cartNum:0,//购物车件数
				username:"",//用户名
			}
		},
		created(){
			this.getAjax()
		},
		computed:{
			...mapGetters(['logined','cartNum'])
		},
		methods:{
			...mapActions(['setLogined','getLogin','getCart']),
			getAjax(){//自执行ajax   
				//获取登录信息
				this.getLogin();
				//获得购物车数量
				this.getCart();
			},
			logout(){//退出登录
				this.ajax.post('/xinda-api/sso/logout')
				.then(res=>{
					if(res.data.status==1){
						this.setLogined(false)
					}
				})
			},
			goVip(){//跳转到会员中心
				this.$router.push({path:"/vipCenter"})
				console.log(1)
			}

		}
	}
</script>
<style lang='less'>
	.topBar {
		width: 100%;
		height: 35px;
		line-height: 35px;
		background: #f2f2f2;
		.login{
			margin-left:5px;
		}
		.register {
			margin-left: 24px;
		}
		.cart, 
		.myOrder {
			display: inline-block;
			float: right;
			margin-right: 17px;
			cursor: pointer;
		}

		.cartIcon {
			width: 21px;
			height: 17px;
			display: inline-block;
			position:relative;
			top: 2px;
			right: 2px;
			background: url(../assets/homeShop/shoppingcart.png);
			background-size: cover;
		}
		.spAccess {
			float: right;
		}
	}
</style>