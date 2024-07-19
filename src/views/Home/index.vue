<template>
	<div class="s-body">
		<a-card bordered class="box-content">
			<div class="head-title">
				<a-space>
					<template v-for="item in routerList" :key="item.name">
						<a-button @click="goPage(item)">{{ item?.meta?.title }}</a-button>
					</template>
				</a-space>
			</div>
			<router-view />
		</a-card>
	</div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const { push, options } = useRouter();
const routerList = options.routes
	.find((item) => item.name === "Home")
	?.children.filter((item) => item.meta?.show);
const goPage = (item) => {
	push({ name: item.name });
};
</script>
<style lang="less" scoped>
.box-content {
	width: 100%;
	height: 100%;
	.head-title {
		width: 100%;
		margin-bottom: 20px;
	}
}
</style>
