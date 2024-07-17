<template>
	<div>
		<h1>孙子组件provide+reject注入使用</h1>
		{{ message }}
	</div>
</template>

<script setup lang='ts'>
import { ref, reactive, inject } from "vue";
const message = inject("count", "默认值");
</script>
<style lang='less' scoped>
</style>