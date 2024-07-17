<!-- Child.vue -->
<script setup>
// 使 v-model 必填
// const model = defineModel({ required: true })
// 提供一个默认值
// const model = defineModel({ default: 0 })

const model = defineModel();
function update() {
	model.value++;
}
</script>

<template>
	<div>Parent bound v-model is: {{ model }}</div>
	<button @click="update">Increment</button>
</template>


<!-- v-model="modal" 是一个便利宏，它的完全模式如下 -->
<!-- Child.vue -->
<!-- <script setup>
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
	<input :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)" />
</template>
// 父组件
<Child
  :modelValue="foo"
  @update:modelValue="$event => (foo = $event)"
/>

-->
