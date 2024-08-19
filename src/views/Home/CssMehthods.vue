<template>
  <div>
    <input type="checkbox" id="toggle" /> Toggle Cards
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="other">Other Element</div>
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
</style>
<script>
  // 静态元数据
  export const meta = {
    title: 'css实现'
  };
</script>
