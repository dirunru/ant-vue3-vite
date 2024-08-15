<template>
  <div>
    <h1>
      登录页面
      <a-button @click="login">登录</a-button>
    </h1>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  const { push } = useRouter();

  window.$log.info('测试全局花式打印');
  const login = () => {
    localStorage.setItem('token', { username: 'dirunru', password: '123456' });
    push('/');
  };
</script>
<style lang="less" scoped></style>
