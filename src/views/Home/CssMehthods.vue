<template>
  <div>
    <input type="checkbox" id="toggle" /> Toggle Cards
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>

    <div class="gradient-text">文字渐变</div>
    <div class="gradient-text1">文字渐变</div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  const checkBtn = () => {
    console.log('document.getElementById', document.getElementById('toggle'));
    document.getElementById('toggle').checked = true;
  };
</script>
<style scoped>
  .card {
    height: auto;
    max-height: 0;
    transition: 0.5s;
    overflow: hidden;
    background: #ccc;
  }
  #toggle:checked ~ .card {
    max-height: 500px;
  }
  .gradient-text {
    font-size: 48px;
    font-weight: bold;
    background: -webkit-linear-gradient(top, rgba(49, 190, 255, 0.36) 20.38%, rgba(255, 255, 255, 0.36) 81.17%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    /* text-shadow: 0 0 2px #051c37; */
    display: inline-block;
  }
  .gradient-text1 {
    font-size: 48px;
    font-weight: bold;
    background: -webkit-linear-gradient(180deg, rgba(49, 190, 255, 0.36) 20.38%, rgba(255, 255, 255, 0.36) 81.17%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }
</style>
<script>
  // 静态元数据
  export const meta = {
    title: 'css实现'
  };
</script>
