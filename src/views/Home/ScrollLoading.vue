<template>
  <div class="container" @scroll="handleScroll">
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.title }}</li>
      <a-spin v-if="loading" />
    </ul>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import dayjs from 'dayjs';
  import { debounce } from 'lodash-es';
  const items = ref([]);
  const loading = ref(false);
  const page = ref(1);

  const handleScroll = debounce((event) => {
    const target = event.target;
    const scrollDistance = target.scrollHeight - target.scrollTop - target.clientHeight;
    if (scrollDistance < 10) {
      window.$log.success('触底');
      // 当用户接近底部时
      loadMore();
    }
  }, 300);
  const loadMore = () => {
    if (loading.value) return;
    loading.value = true;
    // 发送请求加载新数据
    fetchData(page.value).then((newData) => {
      items.value = [...items.value, ...newData];
      loading.value = false;
      page.value++;
    });
  };
  const fetchData = (page) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newData = [];
        for (let i = (page - 1) * 20; i < 20 * page; i++) {
          newData.push({
            id: Date.now() + i,
            title: `Item ${dayjs().format('YYYY-MM-DD HH:mm:ss')} + ${i}`
          });
        }
        resolve(newData);
      }, 1000);
    });
  };
  onMounted(() => {
    // 初始化加载数据
    loadMore();
  });
</script>
<style lang="less" scoped>
  .container {
    height: 300px;
    width: 400px;
    overflow-y: auto;
    border: solid 1px red;
  }
</style>
<script>
  // 静态元数据
  export const meta = {
    title: '滚动加载',
    keepAlive: true
  };
</script>
