<template>
	<div class="s-body">
		<div class="wrapper">
			<div class="block">
				<SLoading />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import SLoading from "@/components/SLoading.vue";
</script>
<style lang='less' scoped>
.wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}
.block {
	width: 200px;
	height: 200px;
}
</style>

<script>
// 静态元数据
export const meta = {
	title: "loading"
};
</script>