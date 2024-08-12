<template>
  <div class="time">
    <div class="time-left">
      <!-- HH:mm:ss -->
      <span class="span1"> {{ time.timeStr.split(' ')[1] }}</span>
      <!-- yyyy-mm-dd -->
      <span class="span2"> {{ time.timeStr.split(' ')[0] }}</span>
    </div>
    <div class="time-right">
      <!-- 工作情况 -->
      <span class="span1"> 今日{{ time.mark }} </span>
      <!-- 星期几 -->
      <span class="span2"> 星期{{ time.week }} </span>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, onUnmounted, reactive } from 'vue';

  const timer = ref(null);
  const time = reactive({
    week: '',
    mark: '',
    timeStr: ''
  });
  // 根据传入的时间，处理成需要的对象函数
  const parseTime = (time, cFormat) => {
    const resObj = {};
    if (arguments.length === 0 || !time) {
      return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
      date = time;
    } else {
      if (typeof time === 'string') {
        if (/^[0-9]+$/.test(time)) {
          // support "1548221490638"
          time = parseInt(time);
        } else {
          // support safari
          time = time.replace(new RegExp(/-/gm), '/');
        }
      }
      if (typeof time === 'number' && time.toString().length === 10) {
        time = time * 1000;
      }
      date = new Date(time);
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    };
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
      const value = formatObj[key];
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value];
      }
      return value.toString().padStart(2, '0');
    });

    resObj.week = ['日', '一', '二', '三', '四', '五', '六'][formatObj.a];
    resObj.mark = ['通宵加班', '加班', '摸鱼', '摸鱼', '摸鱼', '加班', '加班填坑'][formatObj.a];
    resObj.timeStr = time_str;

    for (const key in formatObj) {
      if (formatObj.hasOwnProperty(key)) {
        const element = formatObj[key];
        resObj[key] = element.toString().padStart(2, '0');
      }
    }
    return resObj;
  };
  const getDate = () => {
    const { week, mark, timeStr } = parseTime(new Date());
    time.week = week;
    time.mark = mark;
    time.timeStr = timeStr;
  };

  onMounted(() => {
    timer.value = setInterval(() => {
      getDate();
    }, 1000);
  });
  onUnmounted(() => {
    clearInterval(timer.value);
    timer.value = null;
  });
</script>
<style lang="less" scoped>
  .time {
    // float: right;
    display: flex;
    height: 64px;
    color: #000;
    margin-right: 10px;
    &-left {
      margin-left: 8px;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      .span1 {
        line-height: 28px;
        font-size: 20px;
        font-weight: bold;
      }
      .span2 {
        line-height: 20px;
      }
    }
    &-right {
      display: flex;
      flex-direction: column;
      margin-left: 8px;
      margin-top: 10px;
      .span1 {
        line-height: 28px;
        font-size: 20px;
        font-weight: bold;
      }
      .span2 {
        line-height: 20px;
      }
    }
  }
</style>
