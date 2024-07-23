<template>
	<div>
		<a-card title="用户详情" :bordered="false" style="width: 100%">
			{{ $route.params.id }}
		</a-card>
	</div>
</template>

<script setup>
import { ref, reactive } from "vue";
</script>
<style lang='less' scoped>
</style>