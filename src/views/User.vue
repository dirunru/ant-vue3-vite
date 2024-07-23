<template>
	<div>
		<a-card title="用户管理" :bordered="false" style="width: 100%">
			<a-table :columns="columns" :data-source="data" bordered>
				<template #name="{ name }">
					<a-tag color="blue">{{ name }}</a-tag>
				</template>
				<template #age="{ age }">
					<a-tag color="green">{{ age }}</a-tag>
				</template>
				<!-- <template #action>
					<a-button>详情</a-button>
				</template> -->
			</a-table>
		</a-card>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const columns = [
	{
		title: "姓名",
		dataIndex: "name",
		key: "name",
		scopedSlots: { customRender: "name" }
	},
	{
		title: "年龄",
		dataIndex: "age",
		key: "age",
		// scopedSlots: { customRender: "age" },
		customRender: ({ text, record }) => h("div", null, [h("span", { style: { color: "red" } }, record.age), h("span", null, "/"), h("span", null, 100)])
	},
	{
		title: "操作",
		dataIndex: "action",
		key: "action",
		customRender: ({ text, record }) => h("div", { style: { color: "green" } }, "详情"),
		customCell: (record) => {
			return {
				onClick: (e) => {
					e.stopPropagation();
					router.push({
						path: `/users/detail/` + record.name
					});
				}
			};
		}
	}
];
const data = reactive([
	{
		key: "1",
		name: "John Brown",
		age: 32
	},
	{
		key: "2",
		name: "Jim Green",
		age: 42
	},
	{
		key: "3",
		name: "Joe Black",
		age: 32
	}
]);
</script>
<style lang='less' scoped>
</style>