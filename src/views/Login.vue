<template>
  <div class="login">
    <a-button @click="loginPage = !loginPage">切换</a-button>
    <template v-if="loginPage">
      <!--  :userInfo="userInfo" -->
      <SLoginForm>
        <template #title>
          <h2 class="title">登录</h2>
        </template>
      </SLoginForm>
    </template>
    <template v-else>
      <LoginForm />
    </template>
  </div>
</template>

<script setup>
  import SLoginForm from '@/components/SLoginForm.vue';
  import LoginForm from '@/components/SLoginForm2.vue';
  const loginPage = ref(true);
  const userInfo = JSON.parse(localStorage.getItem('token'));
  import { ref, reactive } from 'vue';

  window.$log.info('测试全局花式打印');
</script>
<style lang="less" scoped>
  .login {
    height: 100vh;
    background: url('https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg') no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    h2 {
      color: #ffffff90;
      margin-top: 5%;
      font-size: 30px;
      letter-spacing: 5px;
    }
  }
</style>
