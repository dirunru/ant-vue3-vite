<template>
	<div ref="echartsContainer" :style="{ width, height }"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import * as echarts from "echarts";
const props = defineProps({
	option: Object,
	width: {
		type: String,
		default: "100%"
	},
	height: {
		type: String,
		default: "100%"
	}
});

const echartsContainer = ref(null);
let chartInstance = null;

onMounted(() => {
	chartInstance = echarts.init(echartsContainer.value);
	chartInstance.setOption(props.option);
});

onUnmounted(() => {
	chartInstance && chartInstance.dispose();
});

// 监听option变化重新设置图表
watch(
	() => props.option,
	(newOption) => {
		if (chartInstance) {
			chartInstance.setOption(newOption);
		}
	},
	{ deep: true }
);
</script>

<style scoped>
/* 样式可以根据需要添加 */
</style>
