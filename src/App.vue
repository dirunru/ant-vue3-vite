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
			<!-- 使用任何自定义过渡和回退到 `fade` -->
			<!-- <router-view v-slot="{ Component, route }">
				<transition :name="route.meta.transition || 'fade'">
					<keep-alive>
						<component :is="Component"  :key="route.path"/>
					</keep-alive>
				</transition>
			</router-view> -->
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
