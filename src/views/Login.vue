<template>
  <div class="login">
    <!-- <SLoginForm>
      <template #title>
        <div class="title">Login</div>
      </template>
    </SLoginForm> -->
    <SLoginForm />
  </div>
</template>

<script setup>
  import SLoginForm from '@/components/SLoginForm2.vue';
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
