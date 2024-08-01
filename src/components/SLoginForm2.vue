<template>
  <div class="login-box">
    <div class="container" ref="container">
      <div class="form-container sign-up-container">
        <form action="#">
          <h1>注册账号</h1>
          <div class="social-container">
            <a href="#" class="social"><FontColorsOutlined /></a>
            <a href="#" class="social"><StrikethroughOutlined /></a>
            <a href="#" class="social"><FontSizeOutlined /></a>
          </div>
          <span>使用email注册账号</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>注册</button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form action="#">
          <h1>登录</h1>
          <div class="social-container">
            <a href="#" class="social"><FontColorsOutlined /></a>
            <a href="#" class="social"><StrikethroughOutlined /></a>
            <a href="#" class="social"><FontSizeOutlined /></a>
          </div>
          <span>账号密码登录</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">忘记密码</a>
          <button>登录</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button class="ghost" id="signIn" @click="handleSignIn">登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost" id="signUp" @click="handleSignUp">注册</button>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <p>
        Created with <i class="fa fa-heart"></i> by
        <a target="_blank" href="https://florin-pop.com">Florin Pop</a>
        - Read how I created this and how you can join the challenge
        <a target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
      </p>
    </footer>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { FontColorsOutlined, StrikethroughOutlined, FontSizeOutlined } from '@ant-design/icons-vue';
  const container = ref(null);
  const handleSignUp = () => {
    container.value.classList.add('right-panel-active');
  };
  const handleSignIn = () => {
    container.value.classList.remove('right-panel-active');
  };
</script>

<style lang="less" scoped>
  .login-box {
    margin: auto;
    width: 700px;
    margin-top: 10%;
  }

  h1 {
    font-weight: bold;
    margin: 0;
  }

  p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }

  span {
    font-size: 12px;
  }

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }

  button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background-color: #ff4b2b;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  }

  button:active {
    transform: scale(0.95);
  }

  button:focus {
    outline: none;
  }

  button.ghost {
    background-color: transparent;
    border-color: #ffffff;
  }

  form {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }

  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow:
      0 14px 28px rgba(0, 0, 0, 0.25),
      0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }

  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }

  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }

  @keyframes show {
    0%,
    49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%,
    100% {
      opacity: 1;
      z-index: 5;
    }
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }

  .container.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }

  .overlay {
    background: #ff416c;
    background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
    background: linear-gradient(to right, #ff4b2b, #ff416c);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .overlay-left {
    transform: translateX(-20%);
  }

  .container.right-panel-active .overlay-left {
    transform: translateX(0);
  }

  .overlay-right {
    right: 0;
    transform: translateX(0);
  }

  .container.right-panel-active .overlay-right {
    transform: translateX(20%);
  }

  .social-container {
    margin: 20px 0;
  }

  .social-container a {
    border: 1px solid #dddddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
  }

  footer {
    background-color: #222;
    color: #fff;
    font-size: 14px;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 999;
  }

  footer p {
    margin: 10px 0;
  }

  footer i {
    color: red;
  }

  footer a {
    color: #3c97bf;
    text-decoration: none;
  }
</style>
