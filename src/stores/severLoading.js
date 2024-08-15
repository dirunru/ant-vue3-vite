import { defineStore } from 'pinia';

export const useSeverLoadingStore = defineStore('myLoading', {
  state: () => {
    return {
      loading: false,
      loadingCount: 0
    };
  },
  actions: {
    addLoading() {
      this.loading = true;
      this.loadingCount++;
    },

    isCloseLoading() {
      this.loadingCount--;
      if (this.loadingCount == 0) {
        this.loading = false;
      }
    },
    initCount() {
      this.loadingCount = 0;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'myLoading',
        storage: localStorage,
        paths: ['loading', 'loadingCount'] // 指定哪些状态需要被持久化
      }
    ]
  }
});
