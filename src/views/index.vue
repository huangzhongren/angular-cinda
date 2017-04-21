<template>
	<div>
		<div class="container">
			<div class="carousel"></div>
			<div class='initCompany'>
				<p>初创企业必备</p>
				<ul>
					<li v-for='item in hq'>
						<div class='companyImg'>
							<img :src="`http://115.182.107.203:8088/xinda/pic/${item.providerImg}`" alt="providerImg">
							<p>{{item.providerName}}</p>
						</div>
						<div class='serviceInfo'>
							<strong>{{item.serviceName.split(/\(+|\（+/)[0]}}</strong>
							<p>{{item.serviceInfo}}</p>
							<p><span>￥{{item.price/100}}</span>{{item.unit}}</p>
						</div>
						<div class='forDetails'>查看详情</div>
					</li>
				</ul>
			</div>
			<div class='intellectual'>
				<p>知识产权</p>
				<div class='intell-l'><img src="../assets/homePage/zhishichanquan-1.jpg" alt="知识产权"></div>
				<div class='intell-r'>
					<dl>
						<div><img src="../assets/homePage/zhishichanquan-2.jpg" alt="商标注册"></div>
						<div><img src="../assets/homePage/zhishichanquan-3.jpg" alt="版权专利"></div>
					</dl>
					<div><img src="../assets/homePage/zhishichanquan-4.jpg" alt="著作权"></div>
				</div>
				<div class="clearfix"></div>
				<ul>
					<li class='certification'>
						<span></span>
						<p>资质认证<br><span>服务商100%实名认证</span></p>
					</li>
					<li class='Payment'>
						<span></span>
						<p>支付安全<br><span>明码标价支付</span></p>
					</li>
					<li class='Insurance'> 
						<span></span>
						<p>保险赔付<br><span>出现问题平台赔付</span></p>
					</li>
					<li class='afterSale'>
						<span></span>
						<p>售后无忧<br><span>客服经理全程跟进</span></p>
					</li>
				</ul>
			</div>
			<div class="provider">
				<p><span :class='isRecommend?"":"active"' @click='isRecommend=false'>推荐服务商</span><span :class='isRecommend?"active":""' @click='isRecommend=true'>推荐服务</span></p>
				<ul class='recommend' v-if="isRecommend">
					<li v-for='item in recommend'>
						<div class='companyImg'>
							<img :src="`http://115.182.107.203:8088/xinda/pic/${item.providerImg}`" alt="providerImg">
							<p>{{item.providerName}}</p>
						</div>
						<div class='serviceInfo'>
							<strong>{{item.serviceName.split(/\(+|\（+/)[0]}}</strong>
							<p>{{item.serviceInfo}}</p>
							<p><span>￥{{item.price/100}}</span>{{item.unit}}</p>
						</div>
						<div class='forDetails'>查看详情</div>
					</li>
				</ul>
				<ul v-else>
					<li v-for='item in servicer'>
						<div class='companyImg'>
							<img :src="`http://115.182.107.203:8088/xinda/pic/${item.providerImg}`" alt="providerImg">
							<p>{{item.providerName}}</p>
						</div>
						<div class='serviceInfo'>
							<p>{{item.products}}</p>
						</div>
					</li>
				</ul>	
			</div>
			<div class="cooperation">
				<p>合作伙伴</p>
				<ul>
					<li><img src="../assets/homePage/winking.jpg" alt=""></li>
					<li><img src="../assets/homePage/zhinangtuan.jpg" alt=""></li>
					<li><img src="../assets/homePage/buoleyuma.jpg" alt=""></li>
					<li><img src="../assets/homePage/goulvyou.jpg" alt=""></li>
					<li><img src="../assets/homePage/yunchou.jpg" alt=""></li>
					<li><img src="../assets/homePage/xinke.jpg" alt=""></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import {mapActions} from 'vuex'
import ajax from 'axios'
	export default{
		data(){
			return {
				hq:[],//初创企业产品
				recommend:'',//推荐服务
				servicer:'',//推荐服务商
				isRecommend:false//是否是推荐服务
			}
		},
		created(){
			this.setIllogin(true)
			this.getLogin();
			this.getCart();
			ajax.post('xinda-api/recommend/list',{}).then(res=>{
				console.log(res.data.data.provider)
				this.hq = res.data.data.hq;
				this.recommend = res.data.data.product;
				this.servicer = res.data.data.provider;
			})
		},
		methods:{
			...mapActions(['setIllogin','getLogin','getCart']),

		},
		components:{
			
		}
	}
</script>
<style lang="less">
	.carousel{
		height: 400px
	}
	.initCompany,
	.provider {
		>p {
			height: 32px;
			line-height: 32px;
			padding-left: 9px;
			border-bottom: 2px solid #2693d4;
			margin-bottom: 48px;
			margin-top: 66px;
			span{
				margin-right: 34px;
				&.active {
					color:#2693d4
				}
			}
		}
		overflow: hidden;
		li {
			width: 270px;
			float:left;
			border: 1px solid #e8e8e8;
			text-align: center;
			box-sizing: border-box;
			padding: 0 8px 0 16px;
			&:not(:first-child){
				margin-left: 38px;
			}
			.companyImg {
				margin-top: 31px;
				p{
					margin-top: 17px;
					color: #2693d4
				}
			}
			.serviceInfo {
				margin-top: 50px;
				strong {
					font-size: 16px;
				}
				p:nth-child(2){
					margin-top: 16px;
					height: 40px;
					word-wrap: break-word;
					//white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis; 
				}
				p:nth-child(3){
					margin-top: 44px;
					span {
						color: #2693d4; 
						font-size: 30px;
						margin-right: 18px;
					}
				}
			}
			.forDetails {
				width: 161px;
				height: 48px;
				color: #2693d4;
				font-size: 18px;
				margin: 40px 0;
				text-align: center;
				line-height: 48px;
				display: inline-block;
				border: 2px solid #2693d4;
				border-radius: 4px;
			}
		}
	}
	.intellectual {
		overflow: hidden;
		img {
			display: block;
		}
		>P{
			margin-top: 52px;
			height: 32px;
			line-height: 32px;
			padding-left: 9px;
			border-bottom: 2px solid #2693d4;
			margin-bottom: 37px;
		}
		>div {
			float:left;
		}
		.intell-r {
			margin-left: 23px;
			dl {
				overflow: hidden;
				>div {
					float:left;
					&:last-child{
						margin-left: 22px;
					}
				}
			}
			>div {
				margin-top: 22px;
			}
		}
		ul {
			li{
				width: 300px;
				height: 154px;
				margin-top: 43px;
				float:left;
				background: #f7f7f7;
				>span {
					height: 59px;
					display: inline-block;
					float:left;
					margin-top: 48px;
					margin-left: 57px;
					margin-right: 20px;
				}
				p {
					float:left;
					margin-top: 52px;
					font-size: 24px;
					color: #696969;
					span {
						font-size: 18px;
					}
				}
				&.certification {
					>span {
						width: 48px;
						background: url(../assets/homePage/zizhirenzheng.png) no-repeat;
						background-size: 100%;
					}
				}
				&.Payment {
					>span {
						width: 54px;
						background: url(../assets/homePage/zhifuanquan.png) no-repeat;
						background-size: 100%;
					}
				}
				&.Insurance {
					>span {
						width: 48px;
						background: url(../assets/homePage/baoxian.png) no-repeat;
						background-size: 100%;
					}
				}
				&.afterSale {
					>span {
						width: 54px;
						background: url(../assets/homePage/shouhou.png) no-repeat;
						background-size: 100%;
					}
				}
			}
		}
	}
	.cooperation {
		p {
			height: 32px;
			line-height: 32px;
			margin-bottom: 42px;
			margin-top: 66px;
			padding-left: 9px;
			border-bottom: 2px solid #2693d4
		}
		overflow: hidden;
		li {
			width: 200px;
			float: left;
			border: 1px solid #ececec;
			box-sizing: border-box;
			img {
				display: inline-block;
				width: 100%;
			}
		}
	}
</style>