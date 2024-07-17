<template>
	<div>
		<ul>
			<slot name="header"></slot>
			<li>msg1 :{{ msg1.message }}</li>
			<li>propG :{{ propG }}</li>
			<li>propH: {{ propH() }}</li>
			<li>isSuccess: {{ isSuccess }}</li>
			<a-divider style="height: 2px; background-color: #7cb305" />
			<slot></slot>
			<a-divider style="height: 2px; background-color: #7cb305" />
			<slot name="footer"></slot>
			<a-divider style="height: 2px; background-color: #7cb305" />
			<slot name="slotName"></slot>
		</ul>
		<!-- 默认插槽被占了具名作用域插槽-->
		<ul>
			<li v-for="item in items" :key="item.id">
				<slot name="item" :item="item" :username="item.name"></slot>
			</li>
		</ul>
	</div>
</template>

<script setup lang='ts'>
import { ref, reactive } from "vue";
// 校验选项中的类型： type String Number Boolean Array Object Date Function Symbol Error
defineProps({
	msg: {
		type: String,
		required: true
	},
	// 数组或者对象类型需要工厂函数进行返回默认值
	msg1: {
		type: Object,
		default(props) {
			// console.log("props", props);
			return { message: "hello" };
		}
	},
	// 自定义类型校验函数
	// 在 3.4+ 中完整的 props 作为第二个参数传入
	propG: {
		validator(value: string, props) {
			// console.log(value, "value", props, "props");
			// The value must match one of these strings
			return ["success", "warning", "danger"].includes(value);
		}
	},
	// 函数类型的默认值
	propH: {
		type: Function,
		// 不像对象或数组的默认，这不是一个工厂函数。这会是一个用来作为默认值的函数
		default() {
			return "Default function";
		}
	},
	isSuccess: {
		type: Boolean
	}
});
const items = ref([
	{ id: 1, name: "Item 1" },
	{ id: 2, name: "Item 2" }
]);
</script>
<style lang='less' scoped>
</style>