<script setup>
import { reactive, ref } from "vue";
import { theme } from "ant-design-vue";
const { useToken } = theme;
const { token } = useToken();
defineProps({
	msg: String
});
const homepage = reactive({
	title: "首页",
	content: "首页内容"
});
const count = ref(0);
</script>


<template>
	<h1>{{ msg }}</h1>
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

