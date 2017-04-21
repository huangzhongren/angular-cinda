<template>
	<div class="myorder">
		<p><span>我的订单</span></p>
		<div class='orderNum'>
			<div>订单号：</div>
			<div>
				<input type="text" class='intText' placeholder="请输入订单号搜索">
				<input type="btn" class='search' value='搜索'>
			</div>
		</div>
		<div class='createTime'>
			<div>创建时间：</div>
			 <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-option='pickerOptions0'></el-date-picker>
			 <el-date-picker v-model="value2" type="date" placeholder="选择日期" :picker-option='pickerOptions0'></el-date-picker>
		</div>
		<ul class='goodsHead'>
			<li class='goodsName'>商品名称</li>
			<li class='price'>单价</li>
			<li class='number'>数量</li>
			<li class='totalCash'>总金额</li>
			<li class='orderStatus'>订单状态</li>
			<li class='orderOperate'>订单操作</li>
		</ul>
		<ul class='order'>
			<li>
				<p></p>
				<dl>
					<dt></dt>
					<dt></dt>
					<dt></dt>
					<div>
						<p>付款</p>
						<p>删除订单</p>
					</div>
				</dl>
			</li>
		</ul>
	</div>
</template>
<script>

import ajax from 'axios'
	export default{
		data(){
			return {
				startTime:"",
				endTime:"",
				pickerOptions0: {
		          disabledDate(time) {
		            return time.getTime() < Date.now() - 8.64e7;
		          }
		        },
		        value1:'',
		        value2:''
			}
		},
		created(){
			ajax.post('/xinda-api/business-order/grid',{
				businessNo:1,
				startTime:this.value1,
				endTime:this.value2,
				start:0
			})
			.then(res=>{

			})
		},
		components:{
			
		}
	}
</script>
<style lang="less">
	.myorder {
		margin-left: 264px;
		>p {
			height: 30px;
			line-height: 30px;
			font-size: 14px;
			color: #2693d4;
			border-bottom: 1px solid #e9e9e9;
			span {
				width: 112px;
				display: block;
				text-align: center;
				border-bottom: 1px solid  #2693d4;
			}
		}
		.orderNum {
			overflow: hidden;
			margin-top: 23px;
			padding-left: 2px;
			div:nth-child(1){
				width: 76px;
			}
			div{
				line-height: 25px;
				float:left;
				.intText {
					width: 265px;
					height: 25px;
					border:1px solid #b0b0b0;
				}
				.search {
					width: 70px;
					height: 26px;
					display: inline-block;
					border: 1px solid #2693d4;
					border-radius: 3px;
					text-align: center;
					color: #2693d4
				}
				input::-ms-input-placeholder{
					text-indent:10px;
				}
				input::-webkit-input-placeholder{
					text-indent:10px;
				}

			}
		}
		.createTime {
			margin-top: 20px;
			padding-left: 2px;
			overflow: hidden;
			div:nth-child(1){
				width: 76px;
			}
			div {
				float: left;
				input {
					width: 113px;
					height: 25px;
					border: 1px solid #b0b0b0;
				}
				&:nth-child(3){
					margin-left: 16px;
				}
			}
			.el-date-editor.el-input {
				width: 113px;
			}
		}
		.goodsHead {
			height: 34px;
			margin-top: 21px;
			line-height: 34px;
			background: #f7f7f7;
			color: #3e3e3e;
			font-size: 12px;
			font-weight: bold;
			li {
				float:left;
				&.goodsName {
					margin-left: 38px;
				}
				&.price {
					margin-left: 255px;
				}
				&.number {
					margin-left: 85px;
				}
				&.totalCash {
					margin-left: 85px;
				}
				&.orderStatus {
					margin-left: 80px;
				}
				&.orderOperate {
					margin-left: 80px; 
				}
			}
		}
		.order {
			li {
				margin-top: 12px;
				border-top: 1px solid #e8e8e8;
				border-left: 1px solid #e8e8e8;
				border-right: 1px solid #e8e8e8;
				border-bottom: 1px solid #e8e8e8;
				>p{
					height: 37px;
					
					background: #f7f7f7;
					border-bottom: 1px solid #e8e8e8;
				}
			}
		}
	}
</style>