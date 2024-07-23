<template>
	<div>
		<!-- 直接从 store 中访问 state -->
		<div>Current Count: {{ counter.count }}</div>
		<a-button @click="counter.increment">方法</a-button>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useCounterStore } from "@/stores/counter";

const counter = useCounterStore();
</script>
<style lang='less' scoped>
</style>