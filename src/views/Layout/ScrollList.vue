<template>
  <!-- <div class="scroll_animate">
    <div class="animate_item">1</div>
    <div class="animate_item">2</div>
    <div class="animate_item">3</div>
    <div class="animate_item">4</div>
    <div class="animate_item">5</div>
    <div class="animate_item">6</div>
    <div class="animate_item">7</div>
    <div class="animate_item">8</div>
  </div> -->
  <SScrollList :columns="columns" :dataSource="dataSource" :headerHeight="40" :rowHeigh="32" :scroll="true" :height="150"></SScrollList>
</template>

<script setup>
  import { ref, reactive, onMounted } from 'vue';
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
  // function scrollAnimate() {
  //   let domArray = document.getElementsByClassName('animate_item');
  //   let domFirst = domArray[0];
  //   let parentDom = document.getElementsByClassName('scroll_animate')[0];
  //   parentDom.style.height = 40 * domArray.length + 'px';
  //   Array.from(parentDom).forEach((item) => {
  //     item.style.height = '40px';
  //   });
  //   domFirst.style.height = '0px';
  //   // 使用setTimeout来模拟异步操作
  //   setTimeout(() => {
  //     // 移除第一个元素
  //     domFirst.remove();
  //     // 将第一个元素添加到.scroll_animate容器的末尾
  //     parentDom.appendChild(domFirst);
  //     // 设置现在将作为最后一个元素的第一个元素的高度为40
  //     domFirst.style.height = '40px';
  //     // 再次使用setTimeout来模拟之后的某个操作，比如执行动画
  //     setTimeout(() => {
  //       scrollAnimate(); // 假设scrollAnimate是一个已经定义的函数
  //     }, 1000);
  //   }, 250);
  // }
  // onMounted(() => {
  //   setTimeout(() => {
  //     scrollAnimate();
  //   }, 1000);
  // });
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
