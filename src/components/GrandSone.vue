<template>
	<div>
		<p>孙子组件provide+reject注入使用</p>
		{{ message }}
		{{ countModel }}
		<a-button @click="addCount">使用inject注入的方法进行改数据</a-button>
	</div>
</template>

<script setup>
import { ref, reactive, inject } from "vue";
// const { message } = inject("count", "默认值");
//多个值，并且修改属性
const { countModel, addCount } = inject("count");
// 默认值可能需要通过调用一个函数或初始化一个类来取得。为了避免在用不到默认值的情况下进行不必要的计算或产生副作用，我们可以使用工厂函数来创建默认值：第三个参数表示默认值应该被当作一个工厂函数。
// const value = inject('key', () => new ExpensiveClass(), true)
</script>
<style lang='less' scoped>
</style>