<template>
	<div class="myEvalution">
		<p><span>我的评价</span></p>
		<div class='evalution'>
			<p>
				<span>未评价</span><span>已评价</span>
			</p>
			<div></div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				
			}
		},
		created(){
			this.$parent.isCur=1;
		}
	}
</script>