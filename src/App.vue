<script setup></script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#00b96b',
      },
    }"
  >
    <router-view />
  </a-config-provider>
</template>
<style scoped></style>
