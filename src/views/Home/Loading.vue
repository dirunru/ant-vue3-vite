<template>
  <div class="s-body">
    <div class="wrapper">
      <div class="block">
        <SLoading />
      </div>
    </div>
    <SelfUseSelf :chartData="item" v-for="(item, index) in chartData" :key="index" />
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import SLoading from '@/components/SLoading.vue';
  import SelfUseSelf from '@/components/SelfUseSelf.vue';

  const chartData = [
    {
      nameCN: '111',
      nameEN: 'en111',
      remarks: '我是111',
      children: [
        {
          nameCN: '222',
          nameEN: 'en222',
          remarks: '我是222',
          children: [
            {
              nameCN: '222-111',
              nameEN: 'en222-111',
              remarks: '我是222-111'
            }
          ]
        },
        {
          nameCN: '333',
          nameEN: 'en333',
          remarks: '我是333'
        }
      ]
    }
  ];
</script>
<style lang="less" scoped>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .block {
    width: 200px;
    height: 200px;
  }
</style>

<script>
  // 静态元数据
  export const meta = {
    title: 'loading'
  };
</script>
