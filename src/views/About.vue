
<template>
	<a-space wrap>
		<!-- <div class="circle" :style="{ backgroundColor: token.colorPrimary }"></div> -->
		<!-- props传参 -->
		<SCard :msg="'提交成功'" :propG="'success'" is-success>
			<template #header>
				<h1>Head插槽</h1>
			</template>
			<template #default>
				<h2>默认插槽</h2>
			</template>
			<!--  v-slot="slotProps" slotProps其实是所有的子组件的props-->
			<!-- 具名作用域插槽 完整写法v-slot:item="slotProps" -->
			<template #item="{ item, username }">
				<div>{{ item.name }} - {{ username }}</div>
			</template>
			<template #footer>
				<p>Footer插槽</p>
			</template>
			<!-- 动态插槽完整写法 -->
			<!-- <template v-slot:[dynamicSlotName]>  </template> -->
			<!-- 缩写为 -->
			<template #[dynamicSlotName]>动态插槽</template>
		</SCard>
		<!-- v-modal父子组件传参 -->
		<Child v-model="countModel" />
	</a-space>
</template>

<script setup>
import { ref, provide } from "vue";
import SCard from "@/components/SCard.vue";
import Child from "@/components/Child.vue";
import { theme } from "ant-design-vue";
const { useToken } = theme;
const { token } = useToken();

const countModel = ref(0);
const dynamicSlotName = ref("slotName");

provide("count", countModel);
</script>




<style scoped>
.circle {
	width: 100px;
	height: 100px;
	border-radius: 50%;
}
</style>

