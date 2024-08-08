<template>
  <div style="background-color: #ececec; padding: 20px">
    <a-row :gutter="16">
      <a-col :span="8" style="margin-bottom: 20px">
        <a-card :bordered="false">
          <template #title>
            {{ a }}
          </template>
          <a-button type="primary" @click="a++">新增a</a-button>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card :bordered="false">
          <template #title>
            {{ b }}
          </template>
          <a-button type="primary" @click="b++">新增b</a-button>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card :bordered="false">
          <template #title>
            {{ c.x }}
          </template>
          <a-button type="primary" @click="c.x *= 2">X</a-button>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card :bordered="false">
          <template #title>
            {{ d.y }}
          </template>
          <a-button type="primary" @click="d.y *= 4">Y</a-button>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card :bordered="false">
          <template #title>
            {{ state.user.age }}
          </template>
          <a-button type="primary" @click="state.user.age++">年龄</a-button>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
  import { ref, reactive, watch } from 'vue';

  const a = ref(0);
  const b = ref(10);
  // 监听单个ref
  watch(a, (newValue, oldValue) => {
    console.log('a', newValue, oldValue);
  });
  // 监听多个
  watch([a, b], (newValue, oldValue) => {
    console.log('[a,b]', newValue, oldValue);
  });
  const c = reactive({
    x: 1
  });

  // 监听单个reactive
  // 因为只是直接修改了响应式对象的某个属性，而不是替换了整个对象，对于对象的引用（即内存地址）实际上没有变化。
  // watch 函数在深度监听（deep: true）时，会检测到对象内部属性的变化，但传递给 watch 回调的新值和旧值都是对同一个对象的引用。
  // 因此，如果你直接在回调中比较新旧值（使用 ===），它们会被认为是相同的（因为它们是同一个对象的引用）。
  // 错误的监听：虽然监听到数据变化了，但是新值和旧值一样
  watch(c, (newValue, oldValue) => {
    console.log('c', 'newValue:', newValue, 'oldValue:', oldValue);
  });
  // 正确的监听
  watch(
    () => c.x,
    (newValue, oldValue) => {
      console.log('c', 'newValue:', newValue, 'oldValue:', oldValue);
    }
  );

  // 监听由ref声明的对象的时候
  const d = ref({
    y: 2
  });
  // 单独监听d是监听不到值的变化的
  watch(d, (newValue, oldValue) => {
    console.log('d:监听不到值的变化', 'newValue:', newValue, 'oldValue:', oldValue);
  });
  watch(
    () => d.value,
    (newValue, oldValue) => {
      console.log('d：可以监听到值的变化,但是新值和旧值一样', 'newValue:', newValue, 'oldValue:', oldValue);
    },
    {
      deep: true // 开启深度监听
    }
  );
  watch(
    () => d.value.y,
    (newValue, oldValue) => {
      console.log('d：可以监听到值的变化，新旧有区别', 'newValue:', newValue, 'oldValue:', oldValue);
    }
  );

  const state = reactive({
    user: {
      name: 'Alice',
      age: 30
    }
  });
  // 监听由reactive生成的深度对象，不加deep:true，监听不到
  watch(
    () => state.user.age,
    (newValue, oldValue) => {
      // 注意：newValue 和 oldValue 是对同一个对象的引用,如果你需要比较内容，应该比较它们的属性
      console.log('state.user：可以监听到值的变化，新旧有区别', 'newValue:', newValue, 'oldValue:', oldValue);
    },
    {
      deep: true
    }
  );
</script>
<style lang="less" scoped></style>
