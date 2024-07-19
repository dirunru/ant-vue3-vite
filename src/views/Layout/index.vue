<template>
	<a-layout>
		<a-layout-header :style="headerStyle">Header</a-layout-header>
		<a-layout-content :style="contentStyle">
			<router-view></router-view>
		</a-layout-content>
		<a-layout-footer :style="footerStyle">Footer</a-layout-footer>
	</a-layout>
</template>

<script setup>
import { h } from "vue";
import { ref, reactive } from "vue";
const headerStyle = {
	textAlign: "center",
	height: "60px",
	paddingInline: 50,
	lineHeight: "64px",
	backgroundColor: "#fff"
};
const contentStyle = {
	textAlign: "center",
	height: "calc(100vh - 110px)"
};
const footerStyle = {
	textAlign: "center",
	backgroundColor: "#fff",
	height: "50px"
};
</script>
<style lang='less' scoped>
</style>