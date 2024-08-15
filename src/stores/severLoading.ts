import { defineStore } from 'pinia';

export const useSeverLoadingStore = defineStore('myLoading', {
  state: () => {
    return {
      loading: false
    };
  },
  actions: {
    isLoading(val: boolean) {
      this.loading = val;
    }
  }
});
