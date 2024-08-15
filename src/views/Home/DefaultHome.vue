<script setup>
  import { ref } from 'vue';
  import { theme } from 'ant-design-vue';
  import TransferTree from '@/components/TransferTree.vue';
  // 请求接口实例
  import { reqGetBannerList } from '@/api';
  import { useRouter } from 'vue-router';
  import { gsap } from 'gsap';
  import STimely from '@/components/STimely.vue';
  const { push } = useRouter();
  const { useToken } = theme;
  const { token } = useToken();
  const fetchData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('111');
      }, 1000);
    });
  };
  window.$log.info('测试全局花式打印');
  const getList = reqGetBannerList({
    pageIndex: 1,
    pageSize: 20
  }).then((res) => {
    console.log('res---table', res);
  });
  const data = await fetchData();
  const count = ref(0);
  const showAuth = ref(false);

  const loginOut = () => {
    console.log('loginOut');
    localStorage.clear();
    push({
      name: 'Login'
    });
  };
  const num = ref(0);
  const rotation = ref(0);
  const go = () => {
    // gsap.to('.circle', { x: '+=200' });
    // gsap.to('.circle', { duration: 2, backgroundColor: '#8d3dae' });
    // gsap.to('.circle', { duration: 2, x: '+=200', rotation: '+=360' });
    // const tl = gsap.timeline();
    // tl.to('.circle', { duration: 1, x: 100 }).to('.circle', { duration: 1, backgroundColor: '#f38630' }, '+=0.5').to('.circle', { duration: 1, x: 0, rotation: -360 }, '+=0.5');
    gsap.to('.circle', {
      keyframes: [
        { duration: 1, x: 100 },
        { duration: 1, backgroundColor: '#f38630', delay: 0.5 },
        { duration: 1, x: 0, rotation: -360, delay: 0.5 }
      ]
    });
  };
</script>

<template>
  <div class="s-body">
    <STimely />
    <a-space wrap>
      <div class="circle" :style="{ backgroundColor: token.colorPrimary }" @click="go">234</div>
      <a-button @click="showAuth = true">树穿梭框</a-button>
      <a-button @click="loginOut">退出</a-button>
    </a-space>
    <div class="container">
      <div class="box" style="mix-blend-mode: multiply"> Box 1 </div>
      <div class="box" style="mix-blend-mode: screen"> Box 2 </div>
    </div>
    <TransferTree v-model:visible="showAuth"></TransferTree>
  </div>
</template>
<style lang="less" scoped>
  .circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background-image: linear-gradient(45deg, #ff6b6b, #ffa500);
    .box {
      width: 100px;
      height: 100px;
      background-color: #fff;
      font-size: 20px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 20px;
    }
  }
</style>
<script>
  // 静态元数据
  export const meta = {
    title: '关于'
  };
</script>
