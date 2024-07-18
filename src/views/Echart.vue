<template>
	<div class="echart">
		<SEchart :option="option" />
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import SEchart from "@/components/SEchart.vue";
const option = {
	color: ["#ee3535", "#ffb34f", "#5599fe", "#60d7c6"],
	dataZoom: {
		type: "inside", // 内置型
		xAxisIndex: [0], // 控制X轴
		startValue: 0,
		endValue: 6,
		disabled: false
	},
	tooltip: {
		trigger: "axis",
		axisPointer: {
			type: "shadow"
		}
	},
	legend: {
		icon: "rect",
		itemWidth: 25,
		selectedMode: false,
		data: [
			{
				name: "未整改重大事故隐患"
			},
			{
				name: "已整改重大事故隐患"
			},
			{
				name: "未整改一般事故隐患"
			},
			{
				name: "已整改一般事故隐患"
			}
		]
	},
	grid: {
		left: "3%",
		right: "4%",
		bottom: "3%",
		containLabel: true
	},
	xAxis: [
		{
			type: "category",
			data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
		}
	],
	yAxis: [
		{
			type: "value",
			axisLine: {
				show: true, // 显示Y轴线
				lineStyle: {
					// color: "#333", // Y轴线的颜色
					width: 1, // Y轴线的宽度
					type: "solid" // 设置为实线（虽然是默认值，但明确写出有助于理解）
				}
			}
		}
	],
	series: [
		{
			name: "已整改重大事故隐患",
			type: "bar",
			stack: "great",
			barWidth: 50,
			data: [1, 3, 3, 6, 4, 2, 7]
		},
		{
			name: "未整改重大事故隐患",
			type: "bar",
			stack: "great",
			barWidth: 50,
			data: [1, 3, 3, 6, 4, 2, 7]
		},

		{
			name: "已整改一般事故隐患",
			type: "bar",
			stack: "generally",
			barWidth: 50,
			data: [1, 3, 3, 6, 4, 2, 7]
		},
		{
			name: "未整改一般事故隐患",
			type: "bar",
			stack: "generally",
			barWidth: 50,
			data: [1, 3, 3, 6, 4, 2, 7]
		}
	]
};
</script>
<style lang='less' scoped>
.echart {
	width: 100%;
	height: 300px;
}
</style>