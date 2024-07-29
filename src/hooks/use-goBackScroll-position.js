// 目的：实现在页面离开之后，记录当前列表的滚动位置，然后在页面重新切换回来之后恢复原来的滚动位置
// 在业务组件中的使用方式
// import { useScrollPositionListener } from '@/hooks/use-goBackScroll-position.js';
// useScrollPositionListener(tableRef, 'projectManagement');

import { onActivated, onDeactivated, ref } from "vue";
export function useScrollPositionListener(tableRef, page) {
  // console.log('tableRef, page', tableRef, page);
  const scrollPosition = ref(0);
  onDeactivated(() => {
    scrollPosition.value = tableRef.value.$el.querySelector('.ant-table-body').scrollTop;
    let obj = {};
    obj[page] = scrollPosition.value;
    sessionStorage.setItem("tableScrollPositionList", JSON.stringify(obj));
  });
  onActivated(() => {
    let params = JSON.parse(sessionStorage.getItem("tableScrollPositionList"));
    if (params) {
      scrollPosition.value = params[page];
      if (scrollPosition.value > 0) {
        tableRef.value.$el.querySelector('.ant-table-body').scrollTop = scrollPosition.value;
      }
    }
  });
  return {
    scrollPosition,
  };
}
