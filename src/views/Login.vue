<template>
  <div class="login">
    <div id="login_box">
      <h2>登录</h2>
      <!-- <div id="input_box">
        <input type="text" placeholder="请输入用户名" />
      </div>
      <div class="input_box">
        <input type="password" placeholder="请输入密码" />
      </div>
      <a-button class="btn">登录</a-button> -->
      <a-form class="login-form" :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item name="username" :rules="[{ required: true, message: '请输入姓名' }]">
          <a-input placeholder="请输入姓名" v-model:value="formState.username" />
        </a-form-item>
        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password placeholder="请输入密码" v-model:value="formState.password" />
        </a-form-item>
        <a-form-item name="remember" :wrapper-col="{ offset: 15, span: 9 }">
          <a-checkbox v-model:checked="formState.remember"> 记住密码 </a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-button class="btn" type="primary" html-type="submit"> 登录 </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';

  interface FormState {
    username: string;
    password: string;
    remember: boolean;
  }
  const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true
  });
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
</script>
<style lang="less" scoped>
  .login {
    height: 100vh;
    background: url('https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg') no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    #login_box {
      width: 30%;
      height: 400px;
      background-color: #00000060;
      margin: auto;
      text-align: center;
      border-radius: 10px;
      padding: 50px 50px;
      margin-top: 10%;
      h2 {
        color: #ffffff90;
        margin-top: 5%;
        font-size: 30px;
        letter-spacing: 5px;
      }
      .login-form {
        margin-top: 40px;
        :deep(.ant-form-item-label > label) {
          color: #fff;
        }
        :deep(.ant-checkbox-wrapper) {
          color: #fff;
        }
      }
      .btn {
        width: 100%;
        border-radius: 10px;
        border: 0;
        color: #fff;
        text-align: center;
        font-size: 15px;
        background-image: linear-gradient(to right, #30cfd0, #330867);
      }
    }
  }
</style>
