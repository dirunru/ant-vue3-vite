<template>
  <div>
    <pre>
      1、setTimeout虽然也可以实现，但是页面来回切换会导致时间混乱
    </pre>
    <pre>
      2、window.requestAnimationFrame实现
    </pre>

    <!-- <a-button @click="add">添加</a-button> -->
    <!-- <SScrollList :columns="columns" :dataSource="dataSource" :headerHeight="40" :rowHeigh="32" :scroll="true" :height="200"></SScrollList> -->

    <div class="scrollBox">
      <vue3-seamless-scroll :list="scrollListArr" class="scroll" v-if="scrollFlag" :step="0.5" :singleHeight="38" :hover="true" :limitScrollNum="5">
        <div v-for="(item, index) in scrollListArr" :key="item.id">
          <span>{{ item.rate }} - {{ index }}</span>
        </div>
      </vue3-seamless-scroll>
    </div>
    <pre>
      3、vue3-seamless-scroll - npm实现

      参数名称	参数介绍	默认值	参数类型	是否必传
      list	无缝滚动列表数据，组件内部使用列表长度。	无	Array	 true
      v-model	通过v-model控制动画滚动与停止，默认开始滚动	true	Boolean	false
      direction	控制滚动方向，可选值up，down，left，right	up	String	false
      isWatch	开启数据更新监听	true	Boolean	false
      hover	是否开启鼠标悬停	false	Boolean	false
      count	动画循环次数，默认无限循环	infinite	Number	false
      limitScrollNum	开启滚动的数据量，只有列表长度大于等于该值才会滚动	5	false	false
      step	步进速度	无	Number	false
      singleHeight	单步运动停止的高度	0	Number	false
      singleWidth	单步运动停止的宽度	0	Number	false
      singleWaitTime	单步停止等待时间(默认值 1000ms)	1000	Number	false
      isRemUnit	singleHeight and singleWidth 是否开启 rem 度量	true	Boolean	false
      delay	动画延时时间	0	Number	false
      ease	动画效果，可以传入贝塞尔曲线数值	ease-in	String | cubic-bezier	false
      copyNum	拷贝列表次数，默认拷贝一次，当父级高度大于列表渲染高度的两倍时可以通过该参数控制拷贝列表次数达到无缝滚动效果	1	Number	false
      wheel	在开启鼠标悬停的情况下是否开启滚轮滚动，默认不开启	false	Boolean	false
      singleLine	启用单行横向滚动	false	Boolean	false
    </pre>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted, onDeactivated, onUnmounted } from 'vue';
  import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
  import { reqGetBannerList } from '@/api';
  let scrollListArr = reactive([]);
  const scrollFlag = ref(false);
  const getList = async () => {
    //根据实际情况调取相应列表接口
    let res = await reqGetBannerList({
      pageIndex: 1,
      pageSize: 10
    });
    let data = res;
    if (data.length > 0) {
      scrollListArr = data;
      scrollFlag.value = true;
    }
  };
  getList();
  // import SScrollList from '@/components/SScrollList.vue';
  // const columns = reactive([
  //   {
  //     title: '姓名',
  //     dataIndex: 'name',
  //     key: 'name'
  //   },
  //   {
  //     title: '年龄',
  //     dataIndex: 'age',
  //     key: 'age'
  //   },
  //   {
  //     title: '住址',
  //     dataIndex: 'address',
  //     key: 'address'
  //   }
  // ]);
  // const dataSource = reactive([
  //   {
  //     key: '1',
  //     name: '1-John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park'
  //   },
  //   {
  //     key: '2',
  //     name: '2-Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park'
  //   },
  //   {
  //     key: '3',
  //     name: '3-Joe Black',
  //     age: 32,
  //     address: 'Sydney No. 1 Lake Park'
  //   },
  //   {
  //     key: '4',
  //     name: '4-Jon Snow',
  //     age: 31,
  //     address: 'Ottawa No. 2 Lake Park'
  //   },
  //   {
  //     key: '5',
  //     name: '5-Jon Snow',
  //     age: 31,
  //     address: 'Ottawa No. 2 Lake Park'
  //   }
  // ]);
  // const add = () => {
  //   dataSource.push({
  //     key: dataSource.length + 1,
  //     name: `${dataSource.length + 1}-Jon Snow`,
  //     age: 31,
  //     address: 'Ottawa No. 2 Lake Park'
  //   });
  // };
</script>
<style lang="less" scoped>
  .scrollBox {
    border: 1px solid #ccc;
    // padding: 6px 0;
    width: 300px;
    margin: 0 auto;
    height: 190px;
    .scroll {
      height: 190px;
      overflow: hidden;
      div {
        height: 38px;
        line-height: 38px;
      }
    }
  }
</style>

<script>
  export const meta = {
    title: '滚动列表'
  };
</script>
