<script setup>
import { ref } from "vue";
import { theme } from "ant-design-vue";
// 请求接口实例
import { reqGetBannerList } from "@/api";
const { useToken } = theme;
const { token } = useToken();
defineProps({
	msg: String
});
const fetchData = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("111");
		}, 1000);
	});
};

const getList = reqGetBannerList({
	pageIndex: 1,
	pageSize: 20
}).then((res) => {
	console.log("res---table", res);
});
const data = await fetchData();
const count = ref(0);
</script>


<template>
	<div class="s-body">
		<h1>{{ msg }}</h1>
		<a-space wrap>
			<div class="circle" :style="{ backgroundColor: token.colorPrimary }"></div>
		</a-space>
	</div>
</template>


<style scoped>
.circle {
	width: 100px;
	height: 100px;
	border-radius: 50%;
}
</style>
<script>
// 静态元数据
export const meta = {
	title: "关于"
};
</script>
