<template>
	<div class='container'>
		<h1>明星推荐产品</h1>
		<ul>
			<li></li>
		</ul>
	</div>
</template>
<script>
import ajax from 'axios'
	export default{
		created(){
			ajax.post('xinda-api/recommend/list',{}).then(res=>{
				//console.log(res)
			})
		}
	}
</script>
<style lang='less'>
	
</style>
