<template>
  <div>
    <pre>
      1、setTimeout虽然也可以实现，但是页面来回切换会导致时间混乱
    </pre>
    <pre>
      2、window.requestAnimationFrame实现
    </pre>
    <pre>
      3、vue3-seamless-scroll - npm
    </pre>
    <a-button @click="add">添加</a-button>
    <SScrollList :columns="columns" :dataSource="dataSource" :headerHeight="40" :rowHeigh="32" :scroll="true" :height="200"></SScrollList>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted, onDeactivated, onUnmounted } from 'vue';
  import SScrollList from '@/components/SScrollList.vue';
  const columns = reactive([
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address'
    }
  ]);
  const dataSource = reactive([
    {
      key: '1',
      name: '1-John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: '2-Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: '3-Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park'
    },
    {
      key: '4',
      name: '4-Jon Snow',
      age: 31,
      address: 'Ottawa No. 2 Lake Park'
    },
    {
      key: '5',
      name: '5-Jon Snow',
      age: 31,
      address: 'Ottawa No. 2 Lake Park'
    }
  ]);
  const add = () => {
    dataSource.push({
      key: dataSource.length + 1,
      name: `${dataSource.length + 1}-Jon Snow`,
      age: 31,
      address: 'Ottawa No. 2 Lake Park'
    });
  };
</script>
<style lang="less" scoped>
  .scroll_animate {
    background: burlywood;
    overflow: hidden;
    .animate_item {
      height: 40px;
      border-bottom: 1px solid red;
      background: burlywood;
      transition: all 0.5s;
      box-sizing: border-box;
    }
  }
</style>

<script>
  export const meta = {
    title: '滚动列表'
  };
</script>
