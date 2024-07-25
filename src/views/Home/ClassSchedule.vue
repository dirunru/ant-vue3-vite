<template>
	<div class="s-body">
		<h1>课程表</h1>
		<pre>
      dragstart：当拖拽开始时触发。
      drag：在拖拽过程中持续触发。
      dragenter：当拖拽元素进入放置目标时触发。
      dragover：当拖拽元素在放置目标上移动时触发。
      dragleave：当拖拽元素离开放置目标时触发。
      drop：当拖拽元素在放置目标上释放时触发。
    </pre>
		<div class="content">
			<div class="left">
				<!-- 循环所有的老师 -->
				<div class="teacher" v-for="(item, index) in teacher" :key="index">{{ item }}</div>
			</div>
			<div class="right">
				<!-- 循环所有的教室 -->
				<div class="classroom" v-for="(item, index) in classroom" :key="index">
					{{ item }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { reqGetClassList } from "@/api";
import { Item } from "ant-design-vue/es/menu";
const classroom = ref([]);
const teacher = ref([]);

const getClassList = async () => {
	const res = await reqGetClassList();
	classroom.value = [...new Set(res.map((item) => item.classroom))];
	teacher.value = res.map((item) => item.teacher);
	console.log("res", classroom.value, teacher.value);
};
getClassList();
</script>
<style lang='less' scoped>
// 定义一个颜色列表
@colors: #ff0000, #00ff00, #0000ff, #ffff00, #ff00ff, #00ffff;
// 定义一个 mixin 来设置随机颜色（实际上是循环使用颜色列表）
.set-random-color(@index) {
	@color: extract(@colors, @index);
	background-color: @color;
}

.content {
	// 采用display:grid 布局
	display: flex;
	.left {
		display: grid;
		width: 100px;
		grid-template-columns: 1fr;
		grid-template-rows: 32px;
		gap: 10px; // 间隔

		.teacher {
			background-color: #fff;
			border: 1px solid #ccc;
			text-align: center;
			border-radius: 3px;
			line-height: 32px;
			// 使用 mixin，这里需要手动指定索引或使用某种逻辑来生成索引
			&:nth-child(1) {
				.set-random-color(1); // 假设这里使用某种逻辑来生成索引
			}
			&:nth-child(2) {
				.set-random-color(2);
			}
			&:nth-child(3) {
				.set-random-color(3);
			}
			&:nth-child(4) {
				.set-random-color(4);
			}
			&:nth-child(5) {
				.set-random-color(5);
			}
			&:nth-child(6) {
				.set-random-color(6);
			}
			&:nth-child(7) {
				.set-random-color(7);
			}
		}
	}
	.right {
		display: grid;
		width: 100px;
		grid-template-columns: 1fr;
		grid-template-rows: 32px;
	}
	.teacher {
		border: 1px solid #ccc;
		text-align: center;
		border-radius: 3px;
		line-height: 32px;
	}
}
</style>

<script>
// 静态元数据
export const meta = {
	title: "课程表"
};
</script>