<script setup>
  import { storeToRefs } from 'pinia';
  import { useSeverLoadingStore } from '@/stores/severLoading';
  const store = useSeverLoadingStore();
  const { loading } = storeToRefs(store); //解构赋值，数据双向绑定，关联store
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#00b96b'
      }
    }"
  >
    <a-spin :spinning="loading" class="fullLoading" tip="Loading...">
      <router-view />
    </a-spin>
  </a-config-provider>
</template>
<style scoped>
  .fullLoading {
    height: 100vh;
  }
</style>
