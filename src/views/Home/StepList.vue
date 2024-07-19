<template>
	<div class="s-body">
		<StepProgress :steps="stepData" :activeIndex="activeStepIndex" />
		<button @click="next">下一步</button>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import StepProgress from "@/components/StepProgress.vue";
import top from "@/assets/images/top.png";
import hot from "@/assets/images/hot.png";
const stepData = ref([
	{ url: top, title: "步骤1", description: "这是步骤1的描述" },
	{ url: hot, title: "步骤2", description: "这是步骤2的描述" },
	{ url: top, title: "步骤3", description: "这是步骤3的描述" }
]);
const activeStepIndex = ref(0);
const next = () => {
	activeStepIndex.value++;
	if (activeStepIndex.value > stepData.value.length - 1) {
		activeStepIndex.value = 0;
	}
};
</script>
<style lang='less' scoped>
</style>

<script>
// 静态元数据
export const meta = {
	title: "步骤条"
};
</script>