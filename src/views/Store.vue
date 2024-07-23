<template>
	<div>
		<!-- 直接从 store 中访问 state -->
		<div>Current Count: {{ counter.count }}</div>
		<div>Current Count Getter: {{ counter.double }}</div>
		<a-button @click="counter.increment">方法</a-button>
		<a-button @click="counter.$reset()">重置</a-button>
		<a-divider style="height: 1px; background-color: #7cb305" />
		<div>Current Count 2: {{ counter1.count }}</div>
		<a-button @click="counter1.increment">方法2</a-button>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useCounterStore, useCounterStore1 } from "@/stores/counter";

const counter = useCounterStore();
const counter1 = useCounterStore1();
</script>
<style lang='less' scoped>
</style>