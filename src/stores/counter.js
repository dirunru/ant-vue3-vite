import { defineStore } from "pinia";

// 写法一：
// 支持$reset()重置state状态
export const useCounterStore = defineStore("counter", {
  state: () => {
    return { count: 0 };
  },
  getters: {
    double: (state) => state.count * 2,
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++;
    },
  },
});

// 写法二：
export const useCounterStore1 = defineStore("counter1", () => {
  const count = ref(0);
  function increment() {
    count.value++;
  }
  return { count, increment };
});
