<template>
  <div class="chart-layout">
    <div class="chart-main">
      <div>{{ chartData.nameCN }}</div>
      <div class="chart-en">{{ chartData.nameEN }}</div>
      <div class="chart-remarks">{{ chartData.remarks }}</div>
    </div>
    <SelfItem :chartData="item" v-for="(item, index) in chartData.children" :key="index" />
  </div>
</template>

<script setup>
  import { ref, reactive, defineEmits, defineProps } from 'vue';
  const emit = defineEmits(['item-click']);
  const props = defineProps({
    chartData: {
      type: Object,
      default: () => ({})
    }
  });
  const handleItemClick = () => {
    emit('item-click');
  };
</script>
<script>
  export default {
    name: 'SelfItem'
  };
</script>
<style lang="less" scoped>
  .chart-main {
    width: 100px;
    border: 1px solid #000;

    > div {
      margin-top: 5px;
    }
  }
</style>
