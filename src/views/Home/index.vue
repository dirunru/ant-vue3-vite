<template>
  <div class="s-body">
    <a-card bordered class="box-content">
      <div class="head-title">
        <a-space>
          <template v-for="item in routerList" :key="item.name">
            <a-button @click="goPage(item)">{{ item?.meta?.title }}</a-button>
          </template>
        </a-space>
      </div>
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition mode="out-in" appear>
            <KeepAlive v-if="$route.meta.keepAlive">
              <Suspense>
                <!-- 主要内容 -->
                <component :is="Component"></component>
                <!-- 加载中状态 -->
                <template #fallback> 正在加载...1 </template>
              </Suspense>
            </KeepAlive>
            <Suspense v-else>
              <!-- 主要内容 -->
              <component :is="Component"></component>
              <!-- 加载中状态 -->
              <template #fallback> 正在加载...2 </template>
            </Suspense>
          </Transition>
        </template>
      </RouterView>
    </a-card>
  </div>
</template>
<script setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  const { push, options } = useRouter();
  console.log('options', options);
  const routerList = options.routes.find((item) => item.name === 'Home')?.children.filter((item) => item.meta?.show);
  const goPage = (item) => {
    push({ name: item.name });
  };
</script>
<style lang="less" scoped>
  .box-content {
    width: 100%;
    height: 100%;
    .head-title {
      width: 100%;
      margin-bottom: 20px;
    }
  }
</style>
