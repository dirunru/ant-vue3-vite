<template>
  <div class="health">
    <a-row :gutter="16">
      <a-col :span="12">
        <div class="health-percent">
          <WaterballChart :percentage="50" />
        </div>
      </a-col>
      <a-col :span="12">
        <div class="health-percent">
          <WaterballChart :percentage="30" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import WaterballChart from '@/components/WaterballChart.vue';
  const percent = ref(30);
</script>
<style lang="less" scoped>
  .health {
    display: flex;
    margin-top: 34px;
    width: 100%;

    &-percent {
      width: 300px;
      height: 400px;
      margin-right: 32px;
      position: relative;
      text-align: center;
    }
  }
</style>
<script>
  // 静态元数据
  export const meta = {
    title: '水球波纹图'
  };
</script>
