<template>
	<div class="cart">
		<div class="container">
			<h2>首页/购物车</h2>
			<p>全部商品(<span>0</span>)</p>
			<table>
				<thead>
					<tr>
						<th class='companyName'>公司</th>
						<th class='serviceGoods'>服务商品</th>
						<th class='price'>单价</th>
						<th class='num'>数量</th>
						<th class='cash'>金额</th>
						<th class='operate'>操作</th>
					</tr>
				</thead>
				<tbody align="center">
					
					<tr>
						<tr class='shop'>店铺：信达北京服务中心</tr>
						<td></td>
						<td>注册分公司</td>
						<td>￥800</td>
						<td class='changeNum'><span>-</span><input type="text" v-model='num'><span>+</span></td>
						<td>$800</td>
						<td>删除</td>
					</tr>
				</tbody>
			</table>
			<p>热门服务</p>
			<ul>
				<li></li>
			</ul>
		</div>

	</div>
</template>
<script>
	export default{
		data(){
			return {
				num:0
			}
		},
		created(){
			this.ajax('')
		}
	}
</script>
<style lang="less">
	.cart {
		h2 {
			margin-top: 27px;
			margin-bottom: 26px;
			font-size: 14px;
			color: #060606;
		}
		p {
			padding-left: 65px; 
			color: #2693d4;
			padding-bottom: 8px;
			border-bottom: 1px solid #bcbdbd;
		}
	}
	table{
		th{
			padding-top: 25px;
		}
		.companyName {
			width: 157px;
		}
		.serviceGoods {
			width: 206px;
		}
		.price {
			width: 211px;
		}
		.num {
			width: 221px;
		}
		.cash {
			width: 225px;
		}
		tbody {
			.shop {
				width: 100%;
				text-indent: 65px;
			}
			.changeNum {
				span {
					width: 18px;
					height: 20px;
					display: inline-block;
					background: #bcbdbd;
					cursor: pointer;
				}
				input {
					width: 30px;
					text-align: center;
				}
			}
		}
	}
</style>