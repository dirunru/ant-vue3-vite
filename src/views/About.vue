
<template>
	<a-space wrap>
		<!-- <div class="circle" :style="{ backgroundColor: token.colorPrimary }"></div> -->
		<SCard :msg="'提交成功'" :propG="'success'" is-success />
	</a-space>
</template>

<script setup>
import { ref } from "vue";
import SCard from "@/components/SCard.vue";
import { theme } from "ant-design-vue";
const { useToken } = theme;
const { token } = useToken();
</script>




<style scoped>
.circle {
	width: 100px;
	height: 100px;
	border-radius: 50%;
}
</style>

