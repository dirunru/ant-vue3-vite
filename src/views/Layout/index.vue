<template>
  <a-layout style="min-height: 100vh">
    <!--  breakpoint="lg" collapsed-width="0" :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }" -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="goPage">
        <a-menu-item v-for="item in routerList" :key="item.name">
          <pie-chart-outlined />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="headerStyle">Header</a-layout-header>
      <a-layout-content :style="contentStyle">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer :style="footerStyle">Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } from '@ant-design/icons-vue';
  import { useRouter } from 'vue-router';
  const collapsed = ref(false);
  const selectedKeys = ref(['1']);

  const { push, options } = useRouter();
  console.log('options', options);
  const routerList = options.routes.find((item) => item.name === 'Layout')?.children.filter((item) => item.meta?.show);
  const goPage = (item) => {
    push({ name: item.key });
    // console.log('item', item);
  };

  const headerStyle = {
    textAlign: 'center',
    height: '60px',
    paddingInline: 50,
    lineHeight: '64px',
    // backgroundColor: "#fff",
    backgroundColor: '#ccc'
  };
  const contentStyle = {
    textAlign: 'center',
    height: 'calc(100vh - 110px)'
  };
  const footerStyle = {
    textAlign: 'center',
    // backgroundColor: "#fff",
    height: '50px',
    backgroundColor: '#ccc'
  };
</script>
<style lang="less" scoped></style>
