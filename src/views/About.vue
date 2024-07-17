
<template>
	<a-space wrap>
		<!-- <div class="circle" :style="{ backgroundColor: token.colorPrimary }"></div> -->
		<!-- props传参 -->
		<SCard :msg="'提交成功'" :propG="'success'" is-success>
			<template #header>
				<h1>Head插槽</h1>
			</template>
			<template #default>
				<p>默认插槽</p>
			</template>

			<template #footer>
				<p>Footer插槽</p>
			</template>
		</SCard>
		<!-- v-modal父子组件传参 -->
		<Child v-model="countModel" />
	</a-space>
</template>

<script setup>
import { ref } from "vue";
import SCard from "@/components/SCard.vue";
import Child from "@/components/Child.vue";
import { theme } from "ant-design-vue";
const { useToken } = theme;
const { token } = useToken();

const countModel = ref(0);
</script>




<style scoped>
.circle {
	width: 100px;
	height: 100px;
	border-radius: 50%;
}
</style>

