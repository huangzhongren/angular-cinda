<template>
	<div class='vipCenter'>
		<div class="container">
			<h2>首页/个人主页</h2>
			<div class='center-l'>
				<div class='userInfo'>
					<div><img src="" alt="头像"></div>
					<p>{{loginInfo.name}}</p>
				</div>
				<ul class='userBar'>
					<li v-for='(item,index) in subItems' :class="isCur==index?'active':''" @mouseenter='isCur=index' @click='isCur = index'><span :class='item.class'></span><router-link :to='item.src' v-text='item.text'></router-link :to='item.src'></li>
				</ul>
			</div>
			<div>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
	export default{
		data(){
			return {
				subItems:[
					{
						text:"我的订单",
						src:"/vipCenter/myOrder",
						class:"orderIcon"
					},
					{
						text:"用户评价",
						src:"/vipCenter/evalution",
						class:"evaluteIcon"
					},
					{
						text:"账户设置",
						src:"/vipCenter/accountSet",
						class:"setting"
					}
				],
				isCur:0
			}
		},
		created(){
			this.getLogin();
		},
		methods:{
			...mapActions(['getLogin'])
		},
		computed:{
			...mapGetters(['loginInfo'])
		}
	}
</script>
<style lang='less'>
	.vipCenter{
		h2 {
			font-size: 14px;
			margin-top: 26px;
			color: #060606;
			margin-bottom: 13px;
		}
		.center-l {
			float: left;
		}
		.userInfo {
			width: 242px;
			height: 141px;
			background: #e9e9e9;
			text-align: center;
		}
		.userBar{
			width: 242px;
			height: 376px;
			margin-top: 10px;
			background: #f7f7f7;
			li {
				height: 50px;
				line-height: 50px;
				font-size: 18px;
				text-align: center;
				&.active {
					background: #e9e9e9;
				}
				span {
					display: inline-block;
					position:relative;
					&.orderIcon {
						width: 22px;
						height: 22px;
						top: 5px;
						left: -12px;
						background: url(../assets/members/dingdan.png) no-repeat;
						background-size: cover;
					}
					&.evaluteIcon {
						width: 23px;
						height: 19px;
						top: 2px;
						left: -12px;
						background: url(../assets/members/pingjia.png) no-repeat;
						background-size: cover;
					}
					&.setting {
						width: 26px;
						height: 24px;
						top: 5px;
						left: -10px;
						background: url(../assets/members/shezhi.png) no-repeat;
						background-size: cover;
					}
				}
				a {
					color: #060606;
				}
			}
		}
	}
</style>