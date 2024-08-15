<script setup>
  import { useSeverLoadingStore } from '@/stores/severLoading';
  const store = useSeverLoadingStore();
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#00b96b'
      }
    }"
  >
    <a-spin :spinning="store.loading" class="fullLoading" tip="Loading...">
      <router-view />
    </a-spin>
  </a-config-provider>
</template>
<style scoped>
  .fullLoading {
    height: 100vh;
  }
</style>
