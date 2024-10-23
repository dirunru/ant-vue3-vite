<template>
  <div class="tslyqk_constituent_3d">
    <div class="echarts3D" ref="echarts3D"></div>
  </div>
</template>

<script setup>
  import * as echarts from 'echarts';
  const { proxy } = getCurrentInstance();
  const myChart = ref(null);

  // 传入数据生成 option

  const initEcharts = () => {
    // 生成配置选项
    const option = {
      tooltip: {},
      legend: {},
      dataset: {
        dimensions: ['product', 'sort', 'company1', 'num1', 'company2', 'num2', 'company3', 'num3'],
        source: [
          ['Matcha Latte', 0, 'a', 43.3, 'b', 85.8, 'c', 93.7],
          ['Milk Tea', 0, 'd', 83.1, 'e', 73.4, 'f', 55.1],
          ['Cheese Cocoa', 0, 'g', 86.4, 'h', 65.2, 'i', 82.5],
          ['Walnut Brownie', 0, 'j', 72.4, 'k', 53.9, 'l', 39.1]
        ]
      },
      // dataset: {
      //   dimensions: ['product', '2015', '2016', '2017'],
      //   source: [
      //     { product: 'Matcha Latte', 2015: 43.3, 2016: 85.8, 2017: 93.7 },
      //     { product: 'Milk Tea', 2015: 83.1, 2016: 73.4, 2017: 55.1 },
      //     { product: 'Cheese Cocoa', 2015: 86.4, 2016: 65.2, 2017: 82.5 },
      //     { product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1 }
      //   ]
      // },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [
        {
          type: 'bar',
          stack: 'num1',
          label: {
            show: true,
            rotate: 90,
            position: 'insideBottom',
            align: 'left',
            verticalAlign: 'middle'
          },
          encode: { x: 'product', y: 'num1', label: ['company1'] }
        },
        {
          type: 'bar',
          stack: 'num1',
          itemStyle: {
            color: 'transparent' //颜色透明
          },
          label: {
            show: true,
            position: 'top'
          },
          encode: { x: 'product', y: 'sort', label: ['num1'] }
        },
        {
          type: 'bar',
          stack: 'num2',
          label: {
            show: true,
            rotate: 90,
            position: 'insideBottom',
            align: 'left',
            verticalAlign: 'middle'
          },
          encode: { x: 'product', y: 'num2', label: ['company2'] }
        },
        {
          type: 'bar',
          stack: 'num2',
          itemStyle: {
            color: 'transparent' //颜色透明
          },
          label: {
            show: true,
            position: 'top'
          },
          encode: { x: 'product', y: 'sort', label: ['num1'] }
        },
        {
          type: 'bar',
          stack: 'num3',
          label: {
            show: true,
            rotate: 90,
            position: 'insideBottom',
            align: 'left',
            verticalAlign: 'middle'
          },
          encode: { x: 'product', y: 'num3', label: ['company3'] }
        },
        {
          type: 'bar',
          stack: 'num3',
          itemStyle: {
            color: 'transparent' //颜色透明
          },
          label: {
            show: true,
            position: 'top'
          },
          encode: { x: 'product', y: 'sort', label: ['num3'] }
        }
        // {
        //   type: 'bar',
        //   barMinWidth: 10,
        //   barMaxWidth: 20,
        //   barGap: 0.5,
        //   label: {
        //     show: true,
        //     position: 'top',
        //     position: ['50%', -18],
        //     // formatter: (params) => {
        //     //   if (!params?.data || params.data === 0) return '';
        //     //   console.log('params.data', params.data);
        //     //   return params.data.name[params.seriesIndex] + ':' + params.data[params.seriesName] || 0;
        //     // },
        //     color: '#ebe806',
        //     fontSize: 11,
        //     minWidth: 36,
        //     height: 10,
        //     padding: [8, 4, 0, 4],
        //     verticalAlign: 'middle',
        //     // backgroundColor: 'rgba(0, 108, 169, 1)',
        //     color: '#000',
        //     align: 'center',
        //     borderWidth: 1,
        //     margin: [0, 8, 16, 0],
        //     borderRadius: 4
        //     // borderColor: 'rgba(0, 108, 169, 1)'
        //   }
        // },
        // {
        //   type: 'bar',
        //   barMinWidth: 10,
        //   barMaxWidth: 20,
        //   barGap: 0.5,
        //   label: {
        //     show: true,
        //     position: 'top',
        //     position: ['50%', -18],
        //     // formatter: (params) => {
        //     //   if (!params?.data || params.data === 0) return '';
        //     //   console.log('params.data', params.data, params);
        //     //   return params.data.name[params.seriesIndex] + ':' + params.data[params.seriesName] || 0;
        //     // },
        //     color: '#ebe806',
        //     fontSize: 11,
        //     minWidth: 36,
        //     height: 10,
        //     padding: [8, 4, 0, 4],
        //     verticalAlign: 'middle',
        //     // backgroundColor: 'rgba(0, 108, 169, 1)',
        //     color: '#000',
        //     align: 'center',
        //     borderWidth: 1,
        //     margin: [0, 8, 16, 0],
        //     borderRadius: 4
        //     // borderColor: 'rgba(0, 108, 169, 1)'
        //   }
        // }
      ]
    };
    myChart.value = echarts.init(proxy.$refs.echarts3D);
    // 绘制图形
    myChart.value.setOption(option);
  };

  //自适应
  function resizeTheChart() {
    if (myChart.value) {
      myChart.value.resize();
    }
  }

  onMounted(() => {
    initEcharts();
    window.addEventListener('resize', resizeTheChart);
  });
</script>

<style lang="less" scoped>
  .tslyqk_constituent_3d {
    width: 100%;
    height: 550px;
    position: relative;
    //   background: red;
    .echarts3D {
      height: 100%;
      height: 550px;
      position: relative;
      // z-index: 310;
      // background: red;
    }
  }
</style>
<script>
  // 静态元数据
  export const meta = {
    title: '多维度处理'
  };
</script>
