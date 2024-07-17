<script setup>
import { reactive, ref } from "vue";
import { theme } from "ant-design-vue";
const { useToken } = theme;
const { token } = useToken();
defineProps({
	msg: String
});
let homePage = reactive({
	name: "首页",
	content: "首页内容",
	count: 0
});
</script>

<template>
	<a-space wrap>
		<a-button type="primary">Primary Button</a-button>
		<a-button>Default Button</a-button>
		<a-button type="dashed">Dashed Button</a-button>
		<a-button type="text">Text Button</a-button>
		<a-button type="link">Link Button</a-button>
		<div class="circle" :style="{ backgroundColor: token.colorPrimary }"></div>
	</a-space>
</template>

<style scoped>
.circle {
	width: 100px;
	height: 100px;
	border-radius: 50%;
}
</style>

