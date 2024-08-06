<template>
  <div id="login_box">
    <slot name="title"></slot>
    <a-form ref="formRef" :model="formState" :rules="accountRules" class="login-form" autocomplete="off" @finish="onSubmit">
      <a-form-item name="username">
        <a-input placeholder="请输入姓名" v-model:value="formState.username" />
      </a-form-item>
      <a-form-item name="password">
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
</template>

<script setup lang="ts">
  import { ref, reactive, toRaw, defineProps } from 'vue';
  import type { UnwrapRef } from 'vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import { useRouter } from 'vue-router';
  import Cookies from 'js-cookie';
  import { encrypt, decrypt } from './jsencrypt';
  const { push } = useRouter();
  interface FormState {
    username: string;
    password: string;
    remember: boolean;
  }
  interface UserInfo {
    username: string;
    password: string;
    remember: boolean;
  }
  const formState: UnwrapRef<FormState> = reactive({
    username: '',
    password: '',
    remember: true
  });
  // 2.定义校验规则
  const accountRules: Record<string, Rule[]> = {
    username: [
      { required: true, message: '必须输入姓名~', trigger: 'blur' },
      {
        pattern: /^[a-z0-9]{6,20}$/,
        message: '必须是6~20数字或字母组成~',
        trigger: 'blur'
      }
    ],
    password: [
      { required: true, message: '必须输入密码信息~', trigger: 'blur' },
      {
        pattern: /^[a-z0-9]{3,}$/,
        message: '必须是3位以上数字或字母组成',
        trigger: 'blur'
      }
    ]
  };
  const props = defineProps<{
    userInfo: UserInfo;
  }>();
  const formRef = ref();
  const onSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        localStorage.setItem('token', JSON.stringify(toRaw(formState)));
        if (formState.remember) {
          Cookies.set('username', formState.username, { expires: 30 }); //设置有效期为30天
          Cookies.set('password', encrypt(formState.password), { expires: 30 });
        } else {
          Cookies.remove('username');
          Cookies.remove('password');
        }
        push({
          name: 'HomeDefaultHome'
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  const getCookie = () => {
    let username = Cookies.get('username');
    let password = Cookies.get('password');
    formState.username = username === undefined ? formState.username : username;
    formState.password = password === undefined ? formState.password : decrypt(password);
  };
  getCookie();
  // 重置表单
  // const resetForm = () => {
  //   formRef.value.resetFields();
  // };
</script>
<style lang="less" scoped>
  #login_box {
    width: 30%;
    height: 400px;
    background-color: #00000060;
    margin: auto;
    text-align: center;
    border-radius: 10px;
    padding: 50px 50px;
    margin-top: 10%;
    .login-form {
      margin-top: 40px;
      :deep(.ant-form-item-explain-error) {
        text-align: left;
      }
      :deep(.ant-form-item-label > label) {
        color: #fff;
      }
      :deep(.ant-checkbox-wrapper) {
        color: #fff;
      }
      :deep(.ant-input),
      :deep(.ant-input-affix-wrapper-focused),
      :deep(.ant-input-affix-wrapper) {
        color: #fff;
        background-color: transparent;
        border-left: none;
        border-right: none;
        border-top: none;
        border-radius: 0;
        box-shadow: none;

        .anticon.ant-input-password-icon {
          color: #fff;
        }
        &::placeholder {
          color: #ffffff90;
          text-align: left;
        }
        &:hover,
        &:focus {
          border-left: none;
          border-right: none;
          border-top: none;
          box-shadow: none;
          border-inline-end-width: 0px;
        }
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
</style>
