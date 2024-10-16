<template>
  <div>
    <div class="waterball-chart">
      <!-- 用于渲染ECharts图表的DOM元素 -->
      <div ref="chartContainer" :style="{ width: size + 'px', height: size + 'px' }"></div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue';
  import * as echarts from 'echarts';
  import 'echarts-liquidfill';
  const props = defineProps({
    percentage: {
      type: Number,
      required: true,
      default: 50
    },
    size: {
      type: Number,
      required: true,
      default: 300
    },
    color: {
      type: String,
      default: '#37cc5b'
    },
    labelNumber: {
      type: String,
      default: ''
    },
    percentSize: {
      type: Number,
      default: 60
    },
    unitSize: {
      type: Number,
      default: 36
    },
    padding: {
      type: Array,
      default: () => [0, 0, 0, 0]
    }
  });

  const chartContainer = ref(null);

  onMounted(() => {
    drawWaterball(props.percentage);
  });

  watch(
    () => props.percentage,
    (newValue) => {
      drawWaterball(newValue);
    }
  );

  const drawWaterball = (percentage) => {
    const chart = echarts.init(chartContainer.value);
    let value = props.percentage / 100;
    let color = props.percentage > 30 ? 'red' : '#71B1FC';
    let option = {
      // backgroundColor: '#001348', //背景色
      // x轴
      xAxis: {
        show: false // 不显示
      },
      // y轴
      yAxis: {
        show: false // 不显示
      },
      title: {
        // text: '完成比例',
        left: 'center',
        top: 140,
        textStyle: {
          color: '#fff',
          fontWeight: 'normal'
          // fontSize: 26
        }
      },
      series: [
        {
          type: 'liquidFill', //水位图
          radius: '75%',
          center: ['51%', '50%'],
          data: [value], // data个数代表波浪数
          amplitude: 10, //水波振幅
          color: [color], // 波浪颜色
          outline: {
            // 轮廓设置
            show: true,
            borderDistance: 10, // 边框与球中间间距
            itemStyle: {
              borderWidth: 2,
              borderColor: '#ECECF8'
            }
          },
          itemStyle: {
            normal: {
              shadowColor: 'rgba(22, 22, 22, 0.5)',
              shadowBlur: 10
            }
          },
          backgroundStyle: {
            borderWidth: 5,
            borderColor: '#EEF2FD',
            shadowColor: '#008DCE',
            color: '#001348'
          },
          label: {
            position: ['50%', '35%'],
            formatter: (value * 100).toFixed(1) + '%',
            textStyle: {
              color: '#fff',
              fontSize: 40
            }
          }
        },
        {
          type: 'line', // 折线图
          markLine: {
            silent: true, // 不触发鼠标事件
            symbol: '', // 标线两端样式
            lineStyle: {
              // 标线样式
              color: '#f00',
              type: 'solid',
              width: 1 // 线宽
            },
            data: [
              {
                // 标线数据
                yAxis: 0.36 // y 轴
              }
            ]
          }
        }
      ]
    };

    chart.setOption(option);
  };
</script>

<style lang="less" scoped>
  .waterball-chart {
    display: inline-block;
    position: relative;
    width: 300px;
    height: 400px;
  }
</style>
