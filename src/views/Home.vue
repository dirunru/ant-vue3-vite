<template>
	<div class="s-body">
		<a-card :bordered="false" style="width: 100%">
			<a-space wrap>
				<!-- <a-button type="primary">Primary Button</a-button>
			<a-button>Default Button</a-button>
			<a-button type="dashed">Dashed Button</a-button>
			<a-button type="text">Text Button</a-button>
			<a-button type="link">Link Button</a-button>
			<div class="circle" :style="{ backgroundColor: token.colorPrimary }"></div> -->
				<button @click="show = !show">Toggle</button>
				<button @click="goPage('About1')">关于</button>
				<button @click="goPage('Store')">状态管理</button>
				<button @click="goPage('User')">用户列表</button>
			</a-space>
			<Transition>
				<p v-if="show">{{ homePage.content }}</p>
			</Transition>
		</a-card>
	</div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { theme } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
const { useToken } = theme;
const { token } = useToken();

const router = useRouter();
const route = useRoute();

const goPage = (name) => {
	router.push({
		name: name
	});
};

defineProps({
	msg: String
});
const show = ref(true);
let homePage = reactive({
	name: "首页",
	content: "首页内容",
	count: 0
});
</script>

<style scoped>
.circle {
	width: 100px;
	height: 100px;
	border-radius: 50%;
}
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}

.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
</style>
