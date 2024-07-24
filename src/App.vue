<script setup>
</script>

<template>
	<a-config-provider
		:theme="{
			token: {
				colorPrimary: '#00b96b'
			}
		}"
	>
		<div id="app">
			<!-- 内容区域 -->
			<router-view />
			<router-view class="helper" name="helper" />
		</div>
	</a-config-provider>
</template>
<style lang="less" scoped>
.helper {
	width: 100px;
}
</style>
