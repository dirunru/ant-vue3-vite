<template>
  <div class="container" ref="scrollRef">       
    <div v-for="(item, index) in items" :key="index" class="item">          
      {{ item }}        
    </div>       
    <div v-if="loading" class="loading">数据加载中...</div>      
  </div>    
</template>
<script setup lang="ts">    
  import { ref, onMounted, onUnmounted } from 'vue';
  const loading = ref(false);    
  let rafId: number | null = null;    
  // 数据列表    
  const items = ref<string[]>(Array.from({ length: 50 }, (_, i) => `Test ${i + 1}`));
  // 滚动容器    
  const scrollRef = ref<HTMLElement | null>(null);
  // 模拟一个异步加载数据效果    
  const moreData = () => {      
    return new Promise<void>((resolve) => {        
      setTimeout(() => {          
        const newItems = Array.from({ length: 50 }, (_, i) => `Test ${items.value.length + i + 1}`);          
        items.value.push(...newItems);         
        resolve();        
      }, 1000);      
    });    
  };
  // 检查是否需要加载更多数据    
  const checkScrollPosition = () => {     
    if (loading.value) return;
    const container = scrollRef.value;      
    if (!container) return;
    const scrollTop = container.scrollTop;      
    const clientHeight = container.clientHeight;      
    const scrollHeight = container.scrollHeight;
    if (scrollHeight - scrollTop - clientHeight <= 100) {       
      startLoading();      
    }    
  };
  // 加载数据    
  const startLoading = async () => {      
    loading.value = true;      
    await moreData();      
    loading.value = false;   
  };
  // 监听滚动事件    
  const handleScroll = () => {      
    console.log('滚动事件触发啦');      
    if (rafId !== null) {        
      window.cancelAnimationFrame(rafId);
    }     
    rafId = window.requestAnimationFrame(checkScrollPosition);    
  };
  // 添加滚动事件监听器    
  onMounted(() => {      
    if (scrollRef.value) {        
      scrollRef.value.addEventListener('scroll', handleScroll);      
    }   
  });
  // 移除相关事件    
  onUnmounted(() => {      
    if (rafId !== null) {        
      window.cancelAnimationFrame(rafId);  
    }      
    if (scrollRef.value) {        
      scrollRef.value.removeEventListener('scroll', handleScroll);     
    }   
  });    
</script>
<style scoped>    
  .container {      
    padding: 20px;      
    max-width: 800px;      
    overflow-y: auto;      
    margin: 0 auto;      
    height: 600px;     
  }
  .item {      
    border-bottom: 1px solid #ccc;      
    padding: 10px;    
  }
  .loading {      
    padding: 10px;      
    color: #999;      
    text-align: center;    
  }    
</style>